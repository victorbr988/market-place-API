const { z } = require('zod');
const { GetUsersService } = require('../../services/users/get-users.service');

const filters_schema = z.object({
  page: z.number().int().min(1).default(1),
});

class GetUsersController {
  static async handler(request, response) {
    const { page } = filters_schema.parse(request.query);

    const users = await GetUsersService.handler({ page });

    return response.json(users);
  }
}

module.exports = {
  GetUsersController,
};
