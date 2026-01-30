import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { getDB, schema } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = getDB();

    const existing = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.email, email));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db
      .insert(schema.users)
      .values({ email, passwordHash, name: name || null })
      .returning({ id: schema.users.id, email: schema.users.email, name: schema.users.name });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.insert(schema.verificationTokens).values({
      email,
      token,
      expiresAt,
    });

    try {
      await sendVerificationEmail(email, token);
    } catch {
      console.warn('Email sending disabled or failed');
    }

    return NextResponse.json({
      user: result[0],
      message: 'Account created. Please check your email to verify.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
