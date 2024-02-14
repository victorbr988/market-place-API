/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.string('name', 92).notNullable();
    table.string('name_clean', 92).notNullable();
    table.string('description', 250).notNullable(); 
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
  return knex.schema.dropTable('categories');
}

module.exports = {
  up,
  down,
};
