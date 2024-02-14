const { connection } = require('../../libs/connection');
const { encode } = require('../../libs/token');

class RefreshSessionService {
  static async handler({ user_id }) {
    const user = await connection('users as u')
      .select('*')
      .where({ 'u.id': user_id, 'u.deleted_at': null })
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return {
      refreshToken: encode({
        id: user.id,
      }),
      user
    } 
  }
}

module.exports = {
  RefreshSessionService,
};
