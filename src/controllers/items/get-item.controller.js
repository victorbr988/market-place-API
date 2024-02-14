const { GetItemService } = require('../../services/items/get-item.service');

class GetItemController {
  static async handler(request, response) {
    const { id: item_id } = request.params
    try {
      const item = await GetItemService.handler({ id: item_id })

      return response.status(200).json(item);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  GetItemController,
};
