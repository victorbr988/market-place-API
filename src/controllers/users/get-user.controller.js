const { GetUserService } = require('../../services/users/get-user.service');

class GetUserController {
  static async handler(request, response) {
    const { id } = request.params;

    try {
      const user = await GetUserService.handler({ id });

      return response.status(200).json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return response.status(404).json({ error: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  GetUserController,
};
