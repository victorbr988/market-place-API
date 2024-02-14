
/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('items', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.string('name', 92).notNullable();
    table.string('name_clean', 92).notNullable();
    table.string('description', 250).notNullable();
    table.integer('type').unsigned().notNullable().defaultTo(0); // 0-none, 1-produto, 2-serviço
    table.double('price').notNullable().defaultTo(0.0);
    table.integer('situation').unsigned().notNullable().defaultTo(2); // 0-bloqueado, 1-aprovado, 2-pré-aprovado
    table.specificType('seler_id', 'char(24)').notNullable();
    table.specificType('category_id', 'char(24)').notNullable();
    table.foreign('seler_id').references("id").inTable("users").onUpdate("restrict").onDelete("restrict");
    table.foreign('category_id').references("id").inTable("categories").onUpdate("restrict").onDelete("restrict");
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
  return knex.schema.dropTable('items');
}

module.exports = {
  up,
  down,
};