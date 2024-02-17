const { z } = require('zod');
const { UpdateItemService } = require('../../services/items/update-item.service');

const condo_schema = z.object({
  name: z.string().min(4).max(92),
  description: z.string().min(4).max(255),
  type: z.coerce.number(),
  price: z.number(),
  category_id: z.string(),
});

class UpdateItemController {
  static async handler(request, response) {
    const { id: user_id, role } = request.user;
    const {id: item_id } = request.params
    const { name, description, type, price, category_id } = condo_schema.parse(request.body);

    if (role !== 1) {
      return response.status(403).json({ error: 'You are not allowed to update a item' });
    }

    try {
      const id = await UpdateItemService.handler({
        id: item_id,
        name,
        description,
        type,
        price,
        category_id,
        user_id,
      });

      return response.status(201).json({ item_id: id });
    } catch (error) {
      if (error.message === 'User not found or has not permission') {
        return response.status(403).json({ message: error.message })
      }
      throw error;
    }
  }
}

module.exports = {
  UpdateItemController,
};
