const { z } = require("zod")
const { GetItemsService } = require('../../services/items/get-items.service');

const filter_items = z.object({
  tab: z.coerce.number().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  categoryType: z.string().optional()
})

class GetItemsController {
  static async handler(request, response) {
    const { tab, search, category, categoryType } = filter_items.parse(request.query);
    console.log(categoryType)
    try {
      const items = await GetItemsService.handler({ tab, search, category, categoryType });

      return response.status(200).json(items);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  GetItemsController,
};
