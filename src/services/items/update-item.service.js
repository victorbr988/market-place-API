const { connection } = require('../../libs/connection');
const { remove_accent } = require('../../libs/utils');
const { GetUserService } = require('../users/get-user.service');

class UpdateItemService {
  static async handler({ id, name, description, type, price, category_id, user_id }) {
    const SELLER_ROLE = 1
    const userFound = await GetUserService.handler({ id: user_id })

    if (!userFound || userFound.role !== SELLER_ROLE) {
      throw new Error('User not found or has not permission');
    }

    const data = {
      name,
      name_clean: remove_accent(name).toLowerCase(),
      description,
      type,
      price,
      category_id,
      seler_id: user_id,
      situation: 1
    };

    try {
      await connection.transaction(async (begin_try) => {
        await begin_try('condos').update(data).where({ id });

        await begin_try.commit()
      })
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  UpdateItemService,
};
