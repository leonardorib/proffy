import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.boolean('is_teacher').notNullable().defaultTo(0);
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
    table.string('avatar').nullable();

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
