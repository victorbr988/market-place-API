const { connection } = require('../../libs/connection');
const { FilterDecorator } = require('../decorators/filter.decorator');

class GetCategoriesService {
  static async handler({ type }) {

    const categories_query = () => connection('categories as c')
      .select('c.id', 'c.name', 'c.name_clean', 'c.description')
      .join('category_type as ct', 'c.type_id', '=', 'ct.id')
      .where({ 'c.deleted_at': null })
      .groupBy('c.id')
      .orderBy('c.name_clean', 'asc')

    const categoriesFiltered = new FilterDecorator(categories_query)
      .filterByCategoryType("ct.type", type || "")
      .queryResult()

    const [categories] = await Promise.all([categoriesFiltered])

    return {
      categories: categories
    };
  }
}

module.exports = {
  GetCategoriesService,
};
