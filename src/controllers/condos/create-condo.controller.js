const { z } = require('zod');
const { CreateCondoService } = require('../../services/condos/create-condo.service');
const { DeleteUploadFiles } = require('../../utils/delete-uploads-file');

const condo_schema = z.object({
  name: z.string().min(4).max(92),
  description: z.string().min(4).max(255),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

class CreateCondoController {
  static async handler(request, response) {
    const images = request.files
    const { name, description, latitude, longitude } = condo_schema.parse(request.body);

    try {
      if (images.length === 0) throw new Error("Images are not present")
      const id = await CreateCondoService.handler({
        name,
        description,
        latitude,
        longitude,
        images,
      });

      return response.status(201).json({ condo_id: id });
    } catch (error) {
      images.map(({ filename }) => DeleteUploadFiles.handler({ filename }))
      
      if (error.message === 'User not found or has not permission') {
        return response.status(403).json({ message: error.message })
      }

      if (error.message === 'Images are not present') {
        return response.status(403).json({ message: error.message })
      }
      throw error;
    }
  }
}

module.exports = {
  CreateCondoController,
};
