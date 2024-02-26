const { connection } = require('../../libs/connection');

class GetCondoService {
  static async handler({ id }) {
    const condo = await connection('condos as c')
      .select('c.*', connection.raw('COALESCE(ARRAY_AGG(i.url), ARRAY[]::text[]) as images'))
      .join('images as i', 'c.id', '=', 'i.condo_id')
      .where({ 'c.deleted_at': null, 'c.id': id })
      .groupBy('c.id')
      .orderBy('c.name_clean', 'asc')
      .first()

    return condo;
  }
}

module.exports = {
  GetCondoService,
};
