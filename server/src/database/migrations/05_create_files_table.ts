import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('files', (table) => {
    table.increments('id').primary();
    table.float('size').notNullable();
    table.string('key').notNullable();
    table.string('url').notNullable();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('files');
}