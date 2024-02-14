const { z } = require('zod');
const { CreateImageService } = require('../../services/images/create-images.service');
const { DeleteUploadFiles } = require('../../utils/delete-uploads-file');

const image_schema = z.object({
  identifier: z.string(),
  typeIdentifier: z.enum(['item_id', 'condo_id']),
});

class CreateImageController {
  static async handler(request, response) {
    const { id: user_id } = request.user
    const { identifier, typeIdentifier } = image_schema.parse(request.body)
    const images = request.files

    try {
      await CreateImageService.handler({ id: user_id, images, identifier, typeIdentifier })

      return response.status(200).json({ message: "Created success" })
    } catch(error) {
      images.map(({ filename }) => DeleteUploadFiles.handler({ filename }))

      if (error.message === 'User not found') {
        return response.status(404).json({ message: error.message })
      }
      if (error.message === 'Item not found') {
        return response.status(404).json({ message: error.message })
      }
      if (error.message === 'Condo not found') {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }
}

module.exports = {
  CreateImageController
}