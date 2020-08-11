import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('favoriteds', (table) => {
    table.increments('id').primary();

    table
      .integer('student_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('teacher_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}
