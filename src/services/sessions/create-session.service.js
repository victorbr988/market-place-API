const { connection } = require('../../libs/connection');
const { compare_text } = require('../../libs/encryption');
const { encode } = require('../../libs/token');

class CreateSessionService {
  static async handler({ email, password }) {
    const user = await connection('users as u')
      .select('*')
      .where({ 'u.email': email, 'u.deleted_at': null })
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    const is_password_matching = await compare_text(user.password, password);

    if (!is_password_matching) {
      throw new Error('Passwords does not match');
    }

    return encode({
      id: user.id,
      role: user.role,
    });
  }
}

module.exports = {
  CreateSessionService,
};
