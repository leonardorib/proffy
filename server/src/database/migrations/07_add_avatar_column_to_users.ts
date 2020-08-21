import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table
      .integer('avatar_id')
      .references('id')
      .inTable('files')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('avatar_id');
  });
}
