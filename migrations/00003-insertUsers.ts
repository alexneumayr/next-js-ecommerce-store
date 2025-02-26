import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'alex',
    password: '$2b$12$qois5ru/l8lp6IuC/mWC8umrUGF123QcMIQqId1TWmX0REGRSomfC',
    role: 'user',
  },
  {
    id: 2,
    username: 'admin',
    password: '$2b$12$pwVhpyuc5pMOrMFV4si45uA.0ZdtJg5rCIZT7T13FjQ2Mlmy0YA7u',
    role: 'admin',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (username, password, role)
      VALUES
        (
          ${user.username},
          ${user.password},
          ${user.role}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
