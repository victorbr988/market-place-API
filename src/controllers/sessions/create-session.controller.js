const { z } = require('zod');
const { CreateSessionService } = require('../../services/sessions/create-session.service');
const { RefreshSessionService } = require('../../services/sessions/refresh-session-service');
const { decode } = require('../../libs/token');

const credentials_schema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

class CreateSessionController {
  static async handler(request, response) {
    const { email, password } = credentials_schema.parse(request.body);

    try {
      const token = await CreateSessionService.handler({ email, password });
      const { id: user_id } = decode(token)
      const { refreshToken } = await RefreshSessionService.handler({ user_id });

      return response
        .status(201)
        .cookie('token', token, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        })
        .cookie('refresh-token', refreshToken, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        })
        .json({ message: 'Credentials authenticated' });
    } catch (error) {
      if (error.message === 'User not found') {
        return response.status(404).json({ error: error.message });
      }

      if (error.message === 'Passwords does not match') {
        return response.status(401).json({ error: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  CreateSessionController,
};
