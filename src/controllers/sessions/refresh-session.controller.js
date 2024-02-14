const { z } = require('zod');
const { CreateSessionService } = require('../../services/sessions/create-session.service');
const { decode } = require('../../libs/token');
const { RefreshSessionService } = require('../../services/sessions/refresh-session-service');

const credentials_schema = z.object({
  refresh_token: z.string(),
});

class RefreshSessionController {
  static async handler(request, response) {
    const { refresh_token } = credentials_schema.parse(request.body);

    const { id: user_id } = decode(refresh_token)
    const {
      refreshToken,
      user: { email, password }, 
    } = await RefreshSessionService.handler({ user_id });
    const token = await CreateSessionService.handler({ email, password });

    try {
      decode(token);

      return response.status(204)
    } catch (error) {
      if (error.message === 'jwt expired') {
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
      }
      if (error.message === 'jwt malformed') {
        return response.status(401).json({ error: 'Invalid session' });
      }

      if (error.message === 'invalid signature') {
        return response.status(401).json({ error: 'Invalid session' });
      }

      throw error;
    }
  }
}

module.exports = {
  RefreshSessionController,
};
