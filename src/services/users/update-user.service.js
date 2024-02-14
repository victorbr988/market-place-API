const { connection } = require('../../libs/connection');
const { remove_accent } = require('../../libs/utils');

class UpdateUserService {
  static async handler({ id, name, email, phone }) {
    const user = await connection('users as u')
      .select('*')
      .where({ 'u.id': id, 'u.deleted_at': null })
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    const data = {
      name,
      name_clean: name && remove_accent(name).toLowerCase(),
      email,
      phone,
      updated_at: connection.fn.now(),
    };

    try {
      await connection('users').update(data).where({ id });
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'users_email_unique') {
        throw new Error('Email already exists');
      }

      throw error;
    }
  }
}

module.exports = {
  UpdateUserService,
};
