/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  await knex('condos').del();

  await knex('condos').insert([
    {
      id: "sap2bch0g766hw7azt6i44cv",
      name: "Vila serena",
      name_clean: "vila serena",
      description: " Oferece aos seus residentes uma combinação de privacidade, segurança, comodidades compartilhadas e uma sensação de comunidade, tornando-se uma opção popular para diversos perfis de famílias e indivíduos que valorizam o estilo de vida comunitário.",
      latitude: "-8.300648",
      longitude: "-35.9519851"
    },
  ]);
}

module.exports = {
  seed,
};
