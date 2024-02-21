/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  await knex('category_type').del();

  await knex('category_type').insert([
    { 
      id: "yvg2v3nyyk4mbyv8ld2rtpok", 
      type: 1,
      name: "Produto"
    },
    { 
      id: "aam2mvxadwcltlvmp8ybu9l1", 
      type: 2,
      name: "Serviço"
    }
  ]);
}

module.exports = {
  seed,
};
