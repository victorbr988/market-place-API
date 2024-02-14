const { z } = require('zod');
const { CreateUserService } = require('../../services/users/create-user.service');

const user_schema = z.object({
  name: z.string().min(3).max(92),
  email: z.string().email().min(3).max(92),
  password: z.string().min(8).max(32),
  phone: z
    .string()
    .regex(/^\d{11}$/)
    .optional(),
  condo_id: z.string()
  // .default(null),
});

class CreateUserController {
  static async handler(request, response) {
    /* TODO: não permitir criar cotas se estiver conectado */

    const { name, email, password, phone, condo_id } = user_schema.parse(request.body);

    try {
      const id = await CreateUserService.handler({
        name,
        email,
        password,
        phone,
        condo_id
      });

      return response.status(201).json({ id });
    } catch (error) {
      if (error.message === 'Email already registered') {
        return response.status(409).json({ error: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  CreateUserController,
};
