import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { getDB, schema } from '@/lib/db';

// GET /api/user/profile - Get current user profile
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
    const users = await db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        name: schema.users.name,
        emailVerified: schema.users.emailVerified,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .where(eq(schema.users.id, parseInt(session.user.id)));

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, email } = await request.json();

    if (!name && !email) {
      return NextResponse.json(
        { error: 'At least one field (name or email) is required' },
        { status: 400 }
      );
    }

    const db = getDB();
    const userId = parseInt(session.user.id);

    // If email is being changed, check if new email is already taken
    if (email && email !== session.user.email) {
      const existing = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.email, email));

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Update user
    const updatedUsers = await db
      .update(schema.users)
      .set({
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email, emailVerified: false }), // Reset email verification when email changes
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, userId))
      .returning({
        id: schema.users.id,
        email: schema.users.email,
        name: schema.users.name,
        emailVerified: schema.users.emailVerified,
      });

    return NextResponse.json({
      user: updatedUsers[0],
      message: email && email !== session.user.email
        ? 'Profile updated. Please verify your new email address.'
        : 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
