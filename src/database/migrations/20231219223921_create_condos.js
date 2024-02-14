/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('condos', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.string('name', 92).notNullable();
    table.string('name_clean', 92).notNullable();
    table.string('description', 255).notNullable();
    table.double('latitude').notNullable();
    table.double('longitude').notNullable();
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at', { useTz: false });
    table.timestamp('deleted_at', { useTz: false });
  });
}

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function down(knex) {
  return knex.schema.dropTable('condos');
}

module.exports = {
  up,
  down,
};
