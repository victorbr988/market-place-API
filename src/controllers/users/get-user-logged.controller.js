const { GetUserService } = require("../../services/users/get-user.service")

class GetUserLoggedController {
  static async handler(request, response) {
    const { id: user_id } = request.user

    try {
      const user = await GetUserService.handler({ id: user_id })
      const tokenExpiresInMiliseconds = request.user.exp * 1000

      const data = {
        id: user.id,
        role: user.role,
        username: user.name,
        email: user.email,
        phone: user.phone,
        condo_id: user.condo_id,
        session: {
          expiresIn: tokenExpiresInMiliseconds
        }
      }

      return response.status(200).json({ user: data })
    } catch(error) {
      request
    }
  }
}

module.exports = {
  GetUserLoggedController
}