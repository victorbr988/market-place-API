const { createId } = require('@paralleldrive/cuid2');
const { connection } = require('../../libs/connection');
const { GetUserService } = require('../users/get-user.service');
const { GetItemService } = require('../items/get-item.service');
const { GetCondoService } = require('../condos/get-condo.service');

class CreateImageService {
  static async handler({ id, images,  identifier, typeIdentifier }) {
    const userFound = await GetUserService.handler({ id })

    if (!userFound) {
      throw new Error('User not found');
    }

    if(typeIdentifier === 'item_id') {
      const itemFound = await GetItemService.handler({ id: identifier })

      if (!itemFound) throw new Error("Item not found")
    }

    if(typeIdentifier === 'condo_id') {
      const condoFound = await GetCondoService.handler({ id: identifier })

      if (!condoFound) throw new Error("Condo not found")
    }

    const imagesData = images.map(( image ) => ({
      id: createId(),
      url: image.filename,
      [typeIdentifier]: identifier
    }))

    try {
      await connection.transaction(async (begin_try) => {
        await begin_try('images').insert(imagesData);

        await begin_try.commit()
      })
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  CreateImageService,
};
