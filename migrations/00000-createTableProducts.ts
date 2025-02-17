import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(150) NOT NULL,
      slug varchar(150) NOT NULL UNIQUE,
      image varchar NOT NULL,
      price integer NOT NULL,
      description varchar NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE products`;
}
