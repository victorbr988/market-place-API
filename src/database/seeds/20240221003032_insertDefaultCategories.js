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
      description: "categoria que engloba todo tipo de produto alimentício",
      type_id: "yvg2v3nyyk4mbyv8ld2rtpok"
    },
    {
      id: "yldpdlzc7lttv2qqfzaq1eib",
      name: 'Vestuário',
      name_clean: "vestuario",
      description: "categoria que engloba produtos como camisas, calças, sapatos, acessórios e etc...",
      type_id: "yvg2v3nyyk4mbyv8ld2rtpok"
    },
    {
      id: "oqt2bch0g766hw7azt6i43bq",
      name: 'Serviços gerais',
      name_clean: "servicos gerais",
      description: "categoria que engloba todos os serviços relacionados ao apartamento como faxina, cozinha, encanador e etc...",
      type_id: "aam2mvxadwcltlvmp8ybu9l1"
    },
  ]);
}

module.exports = {
  seed,
};
