import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('password_hash').notNullable().defaultTo('password');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('password_hash');
  });
}
