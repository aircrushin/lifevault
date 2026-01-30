import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDB, schema } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin?error=invalid_token', request.url));
    }

    const db = getDB();

    const tokens = await db
      .select()
      .from(schema.verificationTokens)
      .where(eq(schema.verificationTokens.token, token));

    if (tokens.length === 0) {
      return NextResponse.redirect(new URL('/auth/signin?error=invalid_token', request.url));
    }

    const { email, expiresAt } = tokens[0];

    if (new Date(expiresAt) < new Date()) {
      await db.delete(schema.verificationTokens).where(eq(schema.verificationTokens.token, token));
      return NextResponse.redirect(new URL('/auth/signin?error=token_expired', request.url));
    }

    await db
      .update(schema.users)
      .set({ emailVerified: true })
      .where(eq(schema.users.email, email));

    await db.delete(schema.verificationTokens).where(eq(schema.verificationTokens.email, email));

    return NextResponse.redirect(new URL('/auth/signin?verified=true', request.url));
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(new URL('/auth/signin?error=verification_failed', request.url));
  }
}
