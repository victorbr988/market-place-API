const { connection } = require('../../libs/connection');

class GetCondosService {
  static async handler() {
    const condos = await connection('condos as c')
      .select('c.*', connection.raw('COALESCE(ARRAY_AGG(i.url), ARRAY[]::text[]) as images'))
      .leftJoin('images as i', 'c.id', '=', 'i.condo_id')
      .where({ 'c.deleted_at': null })
      .groupBy('c.id')
      .orderBy('c.name_clean', 'asc')
      .first();


    return {
      condominios: condos
    };
  }
}

module.exports = {
  GetCondosService,
};
