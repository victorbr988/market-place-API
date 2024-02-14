const { createId } = require('@paralleldrive/cuid2');
const { remove_accent } = require('../../libs/utils');
const { connection } = require('../../libs/connection');
const { GetUserService } = require('../users/get-user.service');

class CreateCondoService {
  static async handler({ name, description, latitude, longitude, images, user_id }) {
    const LIQUIDATOR_ROLE = 0
    
    const data = {
      id: createId(),
      name,
      name_clean: remove_accent(name).toLowerCase(),
      description,
      latitude,
      longitude,
    };

    const imagesData = images.map(( image ) => ({
      id: createId(),
      url: image.filename,
      condo_id: data.id
    }))

    try {
      const userFound = await GetUserService.handler({ id: user_id })

      if ( !userFound || userFound.role !== LIQUIDATOR_ROLE ) {
        throw new Error('User not found or has not permission')
      }

      await connection.transaction(async (begin_try) => {
        await begin_try('condos').insert(data)
        await begin_try('images').insert(imagesData)

        await begin_try.commit();
      })

      return data.id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  CreateCondoService,
};
