/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  await knex('categories').del();

  await knex('categories').insert([
    {
      id: "gv2rt0qvrc6x4fajdp6etyr0",
      name: 'Alimentação',
      name_clean: "alimentacao",
      description: "categoria que engloba todo tipo de produto alimentício"
    },
    {
      id: "yldpdlzc7lttv2qqfzaq1eib",
      name: 'Vestuário',
      name_clean: "vestuario",
      description: "categoria que engloba produtos como camisas, calças, sapatos, acessórios e etc..."
    },
  ]);
}

module.exports = {
  seed,
};
