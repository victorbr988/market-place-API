const { connection } = require('../../libs/connection');

class GetCategoriesService {
  static async handler({ type = 1 }) {

    const categories = await connection('categories as c')
      .select('c.id', 'c.name', 'c.name_clean', 'c.description')
      .join('items as i', 'i.category_id', '=', 'c.id')
      .where({ 'c.deleted_at': null, 'i.type': type })
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
