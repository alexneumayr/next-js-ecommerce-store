import { sql } from './connect';

type User = {
  id: number;
  password: string;
  username: string;
  role: string;
};

/* Returns the user data from the database where the username matches the parameter. */
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

/* Creates a user with the details from the parameters */
export async function createUserInsecure(
  username: string,
  password: string,
  role: string,
) {
  return await sql`
    INSERT INTO
      users (username, password, role)
    VALUES
      (
        ${username},
        ${password},
        ${role}
      )
    RETURNING
      users.*
  `;
}
