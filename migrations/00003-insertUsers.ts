import type { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'alex',
    password: '$2b$10$rDMMNZjqxD8LmQfm/uPxzuuFFn8nttIH.5pwdgwq6cg7GB29anmxi',
    role: 'user',
  },
  {
    id: 2,
    username: 'admin',
    password: '$2b$10$a.RmIfUfl8QPS1titQUcIu0N.vSDIgBT6f408ku0kBLP6LE5reBE.',
    role: 'admin',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (username, password, role,)
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
