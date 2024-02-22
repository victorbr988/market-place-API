const { createId } = require('@paralleldrive/cuid2');
const { remove_accent } = require('../../libs/utils');
const { connection } = require('../../libs/connection');

class CreateCondoService {
  static async handler({ name, description, latitude, longitude, images }) {
    
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
      connection("condos").insert(data)
      connection("images").insert(imagesData)
      
      return data.id;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  CreateCondoService,
};
