import { NextRequest, NextResponse } from 'next/server';
import { getDB, schema } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';

async function getUserIdFromSession(): Promise<number | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;
  if (!sessionToken) return null;

  const db = getDB();
  const sessions = await db
    .select({ userId: schema.sessions.userId })
    .from(schema.sessions)
    .where(eq(schema.sessions.sessionToken, sessionToken))
    .limit(1);

  return sessions[0]?.userId ?? null;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const uploadId = parseInt(id, 10);
    if (isNaN(uploadId)) {
      return NextResponse.json({ error: 'Invalid upload ID' }, { status: 400 });
    }

    const db = getDB();
    const [deleted] = await db
      .delete(schema.uploadHistory)
      .where(
        and(
          eq(schema.uploadHistory.id, uploadId),
          eq(schema.uploadHistory.userId, userId)
        )
      )
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
