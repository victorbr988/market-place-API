const { z } = require('zod');
const { UpdateUserService } = require('../../services/users/update-user.service');

const user_schema = z.object({
  name: z.string().min(3).max(92).optional(),
  email: z.string().email().min(3).max(92).optional(),
  phone: z
    .string()
    .optional(),
});

class UpdateUserController {
  static async handler(request, response) {
    const { id } = request.params;
    const { email, name, phone } = user_schema.parse(request.body);

    try {
      await UpdateUserService.handler({ id, name, email, phone });

      return response.status(200).json({ message: 'User updated' });
    } catch (error) {
      if (error.message === 'User not found') {
        return response.status(404).json({ message: error.message });
      }

      if (error.message === 'Email already exists') {
        return response.status(409).json({ message: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  UpdateUserController,
};
