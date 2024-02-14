const { GetCategoriesService } = require("../../services/categories/get-categories.services");

class GetCategoriesController {
  static async handler(_request, response) {
    
    try {
      const categories = await GetCategoriesService.handler();

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
