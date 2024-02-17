const { connection } = require('../../libs/connection');

class GetItemService {
  static async handler({ id }) {
    const item = await connection('items as i')
      .select('i.id', 'i.name', 'i.type', 'i.description', 'i.price', 'i.seler_id','u.phone as seler_phone','c.id as category_id', connection.raw('ARRAY_AGG(img.url) as images'),)
      .join('images as img', 'i.id', '=', 'img.item_id')
      .join('users as u', 'i.seler_id', '=', 'u.id')
      .join('categories as c', 'i.category_id', '=', 'c.id')
      .where({ 'i.deleted_at': null, 'i.id': id })
      .groupBy('i.id', 'u.phone', 'c.id')
      .orderBy('i.name_clean', 'asc')
      .first()

    return item;
  }
}

module.exports = {
  GetItemService,
};
