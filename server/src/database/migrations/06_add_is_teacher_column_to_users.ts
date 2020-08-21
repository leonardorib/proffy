import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.boolean('is_teacher').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('is_teacher');
  });
}
