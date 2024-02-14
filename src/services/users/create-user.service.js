const { createId } = require('@paralleldrive/cuid2');
const { remove_accent } = require('../../libs/utils');
const { connection } = require('../../libs/connection');
const { hash_text } = require('../../libs/encryption');

class CreateUserService {
  static async handler({ name, email, password, phone, condo_id }) {
    const data = {
      id: createId(),
      name,
      name_clean: remove_accent(name).toLowerCase(),
      email,
      password: await hash_text(password),
      phone,
      condo_id,
      role: 2,
    };

    try {
      await connection('users').insert(data);

      return data.id;
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'users_email_unique') {
        throw new Error('Email already registered');
      }

      throw error;
    }
  }
}

module.exports = {
  CreateUserService,
};
