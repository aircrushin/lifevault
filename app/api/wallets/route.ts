import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';
import { getDB, schema } from '@/lib/db';

// GET /api/wallets - Get user's connected wallets
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = getDB();
    const wallets = await db
      .select({
        id: schema.wallets.id,
        address: schema.wallets.address,
        walletType: schema.wallets.walletType,
        isPrimary: schema.wallets.isPrimary,
        createdAt: schema.wallets.createdAt,
      })
      .from(schema.wallets)
      .where(eq(schema.wallets.userId, parseInt(session.user.id)))
      .orderBy(schema.wallets.createdAt);

    return NextResponse.json({ wallets });
  } catch (error) {
    console.error('Get wallets error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
}

// POST /api/wallets - Connect a new wallet
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { address, walletType } = await request.json();

    if (!address || !walletType) {
      return NextResponse.json(
        { error: 'Address and wallet type are required' },
        { status: 400 }
      );
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const db = getDB();
    const userId = parseInt(session.user.id);

    // Check if wallet is already connected for this user
    const existing = await db
      .select({ id: schema.wallets.id })
      .from(schema.wallets)
      .where(
        and(
          eq(schema.wallets.userId, userId),
          eq(schema.wallets.address, address.toLowerCase())
        )
      );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Wallet already connected' },
        { status: 409 }
      );
    }

    // If this is the first wallet, make it primary
    const existingWallets = await db
      .select({ id: schema.wallets.id })
      .from(schema.wallets)
      .where(eq(schema.wallets.userId, userId));

    const isPrimary = existingWallets.length === 0;

    // Connect the wallet
    const result = await db
      .insert(schema.wallets)
      .values({
        userId,
        address: address.toLowerCase(),
        walletType,
        isPrimary,
      })
      .returning({
        id: schema.wallets.id,
        address: schema.wallets.address,
        walletType: schema.wallets.walletType,
        isPrimary: schema.wallets.isPrimary,
        createdAt: schema.wallets.createdAt,
      });

    return NextResponse.json({
      wallet: result[0],
      message: 'Wallet connected successfully',
    });
  } catch (error) {
    console.error('Connect wallet error:', error);
    return NextResponse.json(
      { error: 'Failed to connect wallet' },
      { status: 500 }
    );
  }
}

// DELETE /api/wallets - Disconnect a wallet
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const walletId = searchParams.get('id');

    if (!walletId) {
      return NextResponse.json(
        { error: 'Wallet ID is required' },
        { status: 400 }
      );
    }

    const db = getDB();
    const userId = parseInt(session.user.id);

    // Verify wallet belongs to user
    const wallet = await db
      .select({ id: schema.wallets.id, isPrimary: schema.wallets.isPrimary })
      .from(schema.wallets)
      .where(
        and(
          eq(schema.wallets.id, parseInt(walletId)),
          eq(schema.wallets.userId, userId)
        )
      );

    if (wallet.length === 0) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    // If deleting primary wallet, make another wallet primary if exists
    if (wallet[0].isPrimary) {
      const otherWallets = await db
        .select({ id: schema.wallets.id })
        .from(schema.wallets)
        .where(
          and(
            eq(schema.wallets.userId, userId),
            eq(schema.wallets.id, parseInt(walletId))
          )
        )
        .limit(1);

      if (otherWallets.length > 0) {
        await db
          .update(schema.wallets)
          .set({ isPrimary: true })
          .where(eq(schema.wallets.id, otherWallets[0].id));
      }
    }

    // Delete the wallet
    await db
      .delete(schema.wallets)
      .where(
        and(
          eq(schema.wallets.id, parseInt(walletId)),
          eq(schema.wallets.userId, userId)
        )
      );

    return NextResponse.json({ message: 'Wallet disconnected successfully' });
  } catch (error) {
    console.error('Disconnect wallet error:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect wallet' },
      { status: 500 }
    );
  }
}

// PATCH /api/wallets/set-primary - Set a wallet as primary
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { walletId } = await request.json();

    if (!walletId) {
      return NextResponse.json(
        { error: 'Wallet ID is required' },
        { status: 400 }
      );
    }

    const db = getDB();
    const userId = parseInt(session.user.id);

    // Verify wallet belongs to user
    const wallet = await db
      .select({ id: schema.wallets.id })
      .from(schema.wallets)
      .where(
        and(
          eq(schema.wallets.id, parseInt(walletId)),
          eq(schema.wallets.userId, userId)
        )
      );

    if (wallet.length === 0) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    // Remove primary from all user's wallets
    await db
      .update(schema.wallets)
      .set({ isPrimary: false })
      .where(eq(schema.wallets.userId, userId));

    // Set new primary wallet
    await db
      .update(schema.wallets)
      .set({ isPrimary: true })
      .where(eq(schema.wallets.id, parseInt(walletId)));

    return NextResponse.json({ message: 'Primary wallet updated successfully' });
  } catch (error) {
    console.error('Set primary wallet error:', error);
    return NextResponse.json(
      { error: 'Failed to set primary wallet' },
      { status: 500 }
    );
  }
}
