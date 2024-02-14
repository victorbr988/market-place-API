const { z } = require("zod");
const { GetCategoriesService } = require("../../services/categories/get-categories.services");

const filter_category = z.object({
  type: z.coerce.number().optional(),
})

class GetCategoriesController {
  static async handler(request, response) {
    const { type } = filter_category.parse(request.query)
    try {
      const categories = await GetCategoriesService.handler({ type });

      return response.status(200).json(categories);
    } catch (error) {
      if (error.message === 'User not found or has not permission') {  
        return response.status(403).json({ message: error.message })
      }

      throw error;
    }
  }
}

module.exports = {
  GetCategoriesController,
};
