/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.specificType('type_id', 'char(24)').notNullable();
    table.foreign('type_id').references("id").inTable("category_type").onUpdate("restrict").onDelete("restrict");
  });
}

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function down(knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.dropColumn('type_id');
  });
}

module.exports = {
  up,
  down,
};
