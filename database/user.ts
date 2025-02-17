import { sql } from './connect';

type User = {
  id: number;
  password: string;
  username: string;
  role: string;
};

export async function getUserInsecure(username: string) {
  return await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
}
