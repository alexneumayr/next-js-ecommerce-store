import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { sql } from '../../../../database/connect';

type ResponseBodySignup = { message: string } | { error: string };

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodySignup>> {
  try {
    const { username, password } = await request.json();

    const hashedPassword = await hash(password, 10);
    await sql`
      INSERT INTO
        users (username, password, role)
      VALUES
        (
          ${username},
          ${hashedPassword},
          'user'
        )
    `;
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
  return NextResponse.json({ message: 'success' });
}
