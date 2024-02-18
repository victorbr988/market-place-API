const { z } = require('zod');
const { GetUsersService } = require('../../services/users/get-users.service');

const filters_schema = z.object({
  page: z.number().int().min(1).default(1),
  role: z.coerce.number().optional(),
  condo_id: z.string().optional(),
});

class GetUsersController {
  static async handler(request, response) {
    const { page, role, condo_id } = filters_schema.parse(request.query);

    const users = await GetUsersService.handler({ page, role, condo_id });

    return response.json(users);
  }
}

module.exports = {
  GetUsersController,
};
