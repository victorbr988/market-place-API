/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('images', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.string('url', 255).notNullable();
    table.specificType('item_id', 'char(24)').nullable();
    table.specificType('condo_id', 'char(24)').nullable();
    table.foreign('item_id').references('id').inTable("items").onUpdate("restrict").onDelete("restrict");
    table.foreign('condo_id').references('id').inTable("condos").onUpdate("restrict").onDelete("restrict");
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
  return knex.schema.dropTable('images');
}

module.exports = {
  up,
  down,
};
