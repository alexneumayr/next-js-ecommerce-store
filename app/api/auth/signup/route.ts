import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { createUserInsecure } from '../../../../database/user';

type User = {
  id: number;
  username: string;
  role: string;
};

type ResponseBodySignup = { user: User } | { error: string };

/* Handles the POST request: Hashes the password and then creates the user with the specified credentials in the database. */
export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodySignup>> {
  const { username, password } = await request.json();

  const hashedPassword = await hash(password, 12);

  /* Creates the user in the database. For security reasons at the moment every user created with this function has the role "user". */
  const createdUser = await createUserInsecure(
    username,
    hashedPassword,
    'user',
  );
  if (createdUser) {
    return NextResponse.json({
      user: createdUser,
    });
  } else {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
