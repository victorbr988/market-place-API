const { connection } = require('../../libs/connection');
const { FilterDecorator } = require('../decorators/filter.decorator');
const { aggregateByCategory } = require('./aggregate-by-category-items');
const { remove_accent } = require("../../libs/utils");

class GetItemsService {
  static async handler({ tab, search, category, categoryType }) {
    
    const baseQuery = () => connection('items as i')
      .select('i.*', connection.raw('ARRAY_AGG(img.url) as images'),'c.name as categoryName', 'c.name_clean as categoryNameClean', 'ct.id as categoryTypeId')
      .join('images as img', 'i.id', '=', 'img.item_id')
      .join('categories as c', 'i.category_id', '=', 'c.id')
      .join('category_type as ct', 'c.type_id', '=', 'ct.id')
      .where({ 'i.deleted_at': null })
      .groupBy('i.id', 'c.name', 'c.name_clean', 'ct.id')
      .orderBy('i.name', 'asc');

    const condosQuery = () => connection('condos as c')
      .select('c.*', connection.raw('ARRAY_AGG(i.url) as images'))
      .join('images as i', 'c.id', '=', 'i.condo_id')
      .where({ 'c.deleted_at': null })
      .groupBy('c.id')
      .orderBy('c.name_clean', 'asc')

    const tabProducts = tab === 1 ? tab: 1;
    const tabServices = tab === 2 ? tab: 2;
    
    const productsQuery = new FilterDecorator(baseQuery)
      .filterByCategoryType('ct.id', categoryType)
      .filterByTab('i.type', tabProducts)
      .filterByCategory('c.name_clean', category || '')
      .filterByName('i.name_clean', remove_accent(search?.toLowerCase() || ''))
      .queryResult()

    const servicesQuery = new FilterDecorator(baseQuery)
      .filterByTab('i.type', tabServices)
      .filterByName('i.name_clean', remove_accent(search?.toLowerCase() || ''))
      .filterByCategory('c.name_clean', category || '')
      .filterByCategoryType('ct.id', categoryType)
      .queryResult()

    const condoFilteredQuery = new FilterDecorator(condosQuery)
      .filterByName('c.name_clean', remove_accent(search?.toLowerCase() || ''))
      .queryResult()
    const [products, services, condominios] = await Promise.all([productsQuery, servicesQuery, condoFilteredQuery])

    return {
      products: aggregateByCategory(products),
      services: aggregateByCategory(services),
    }
  }
}

module.exports = {
  GetItemsService,
};
