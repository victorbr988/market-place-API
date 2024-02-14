const { connection } = require('../../libs/connection');

class GetItemsByUserIdService {
  static async handler({ id }) {
    const items = await connection('items as i')
      .select('i.id', 'i.name', 'i.type', 'i.description', 'i.price', 'i.seler_id', connection.raw('ARRAY_AGG(img.url) as images'))
      .join('images as img', 'i.id', '=', 'img.item_id')
      .where({ 'i.deleted_at': null, 'i.seler_id': id })
      .groupBy('i.id')
      .orderBy('i.name_clean', 'asc')

    return items;
  }
}

module.exports = {
  GetItemsByUserIdService,
};
