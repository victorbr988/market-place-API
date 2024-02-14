const { connection } = require('../../libs/connection');
const { remove_accent } = require('../../libs/utils');
const { GetUserService } = require('../users/get-user.service');

class UpdateCondoService {
  static async handler({ id, name, description, latitude, longitude, user_id }) {
    const userFound = await GetUserService.handler({ id: user_id })

    if (!userFound || userFound) {
      throw new Error('User not found or has not permission');
    }

    const data = {
      name,
      name_clean: name && remove_accent(name).toLowerCase(),
      description,
      latitude,
      longitude
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
  UpdateCondoService,
};
