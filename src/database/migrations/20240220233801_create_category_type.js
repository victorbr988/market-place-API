/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('category_type', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.integer("type").unsigned().notNullable() // 1 - Produto / 2 - Serviço
    table.string('name', 92).notNullable();
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
  return knex.schema.dropTable('category_type');
}

module.exports = {
  up,
  down,
};
