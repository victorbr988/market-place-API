const { DeleteImageService } = require("../../services/images/delete-images.service");
const { DeleteUploadFiles } = require("../../utils/delete-uploads-file");

class DeleteImageController {
  static async handler(request, response) {
    const { id: user_id } = request.user
    const { id: image_id } = request.params

    try {
      await DeleteImageService.handler({ id: user_id, filename: image_id })

      DeleteUploadFiles.handler({ filename: image_id })

      return response.status(200).json({ message: "Deleted success" })
    } catch(error) {
      if (error.message === 'User not found') {
        return response.status(404).json({ message: error.message })
      }
      
      throw error
    }
  }
}

module.exports = {
  DeleteImageController
}