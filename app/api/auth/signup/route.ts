import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';

type ResponseBodySignup = { message: string };

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodySignup>> {
  try {
    const { username, password } = await request.json();
    console.log({ username, password });

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
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: 'success' });
}
