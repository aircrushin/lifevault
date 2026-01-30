import { NextRequest, NextResponse } from 'next/server';
import { getDB, schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    const db = getDB();
    const uploads = await db
      .select()
      .from(schema.uploadHistory)
      .where(eq(schema.uploadHistory.userId, userId))
      .orderBy(desc(schema.uploadHistory.createdAt));

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error('Failed to fetch upload history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    const body = await request.json();
    const {
      fileName,
      fileSize,
      fileType,
      encryptionHash,
      baseValue,
      totalValue,
      monthlyYield,
      completenessMultiplier,
      scarcityMultiplier,
      demandMultiplier,
      metadata,
    } = body;

    if (!fileName || !fileSize || !fileType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDB();
    const [upload] = await db
      .insert(schema.uploadHistory)
      .values({
        userId,
        fileName,
        fileSize,
        fileType,
        encryptionHash,
        status: 'completed',
        baseValue: baseValue?.toString(),
        totalValue: totalValue?.toString(),
        monthlyYield: monthlyYield?.toString(),
        completenessMultiplier: completenessMultiplier?.toString(),
        scarcityMultiplier: scarcityMultiplier?.toString(),
        demandMultiplier: demandMultiplier?.toString(),
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();

    return NextResponse.json({ upload }, { status: 201 });
  } catch (error) {
    console.error('Failed to create upload record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
