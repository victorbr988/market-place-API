const { z } = require('zod');
const { CreateItemService } = require('../../services/items/create-item.service');
const { DeleteUploadFiles } = require('../../utils/delete-uploads-file');

const condo_schema = z.object({
  name: z.string().min(4).max(92),
  description: z.string().min(4).max(255),
  type: z.coerce.number(),
  price: z.coerce.number(),
  category_id: z.string(),
});

class CreateItemController {
  static async handler(request, response) {
    const { id: user_id, role } = request.user;
    const images = request.files
    const { name, description, type, price, category_id } = condo_schema.parse(request.body);

    if (role !== 1) {
      return response.status(403).json({ error: 'You are not allowed to create a item' });
    }

    try {
      const id = await CreateItemService.handler({
        name,
        description,
        type,
        price,
        category_id,
        images,
        user_id,
      });

      return response.status(201).json({ item_id: id });
    } catch (error) {
      images.map(({ filename }) => DeleteUploadFiles.handler({ filename }));

      if (error.message === 'User not found or has not permission') {
        return response.status(403).json({ message: error.message });
      }
      throw error;
    }
  }
}

module.exports = {
  CreateItemController,
};
