import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    message: 'Use `pnpm db:push` to sync schema with database',
  });
}
