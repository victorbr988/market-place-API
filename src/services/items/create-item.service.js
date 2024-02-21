const { createId } = require('@paralleldrive/cuid2');
const { remove_accent } = require('../../libs/utils');
const { connection } = require('../../libs/connection');
const { GetUserService } = require('../users/get-user.service');

class CreateItemService {
  static async handler({ name, description, type, price, category_id, images, user_id }) {
    const SELLER_ROLE = 1

    const data = {
      id: createId(),
      name,
      name_clean: remove_accent(name).toLowerCase(),
      description,
      type,
      price,
      category_id,
      seler_id: user_id,
      situation: 2
    };

    const imagesData = images.map(( image ) => ({
      id: createId(),
      url: image.filename,
      item_id: data.id
    }))

    try {
      const userFound = await GetUserService.handler({ id: user_id })

      if (!userFound || userFound.role !== SELLER_ROLE) {
        throw new Error('User not found or has not permission')
      }

      await connection('items').insert(data)
      await connection('images').insert(imagesData)

      return data.id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  CreateItemService,
};
