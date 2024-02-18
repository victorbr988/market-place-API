const { connection } = require('../../libs/connection');

class GetUserService {
  static async handler({ id }) {
    const user = await connection('users as u')
      .select('u.id', 'u.name', 'u.email', 'u.role', 'u.phone', 'u.condo_id', 'u.created_at')
      .where('u.id', id)
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

module.exports = {
  GetUserService,
};
