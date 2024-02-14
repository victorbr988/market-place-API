/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.specificType('id', 'char(24)').primary().notNullable();
    table.specificType('phone', 'char(11)');
    table.string('name', 92).notNullable();
    table.string('name_clean', 92).notNullable();
    table.string('email', 92).unique().notNullable();
    table.string('password', 64).notNullable();
    table.integer('role').unsigned().notNullable().defaultTo(2); // 0 - síndico, 1 - vendedor, 2 - usuário
    table.specificType('condo_id', 'char(24)').nullable();
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
  return knex.schema.dropTable('users');
}

module.exports = {
  up,
  down,
};
