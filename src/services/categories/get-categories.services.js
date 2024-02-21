const { connection } = require('../../libs/connection');

class GetCategoriesService {
  static async handler({ type = '' }) {

    const categories = await connection('categories as c')
      .select('c.id', 'c.name', 'c.name_clean', 'c.description')
      .where({ 'c.deleted_at': null, 'c.type_id': type })
      .groupBy('c.id')
      .orderBy('c.name_clean', 'asc')

    return {
      categories: categories
    };
  }
}

module.exports = {
  GetCategoriesService,
};
