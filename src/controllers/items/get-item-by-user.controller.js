const { GetItemsByUserIdService } = require("../../services/items/get-items-by-user.service");

class GetItemByUserIdController {
  static async handler(request, response) {
    const { id: user_id } = request.params
    try {
      const items = await GetItemsByUserIdService.handler({ id: user_id })

      return response.status(200).json(items);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  GetItemByUserIdController,
};
