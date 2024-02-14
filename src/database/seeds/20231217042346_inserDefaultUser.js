/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      id: "l4gqgmahpuu2jxamcru3g2f0",
      name: "admin",
      name_clean: "Admin",
      email: "admin@gmail.com",
      password: "$2b$10$5aGrewToG8m0iqY9f1RPQeO3LPRaNQlU5YiQ4mgdGWofpc9koi8mO", //admin@123
      phone: "912356954",
      condo_id: null,
      role: 0
    }
  ]);
}

module.exports = {
  seed,
};
