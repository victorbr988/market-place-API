const { connection } = require('../../libs/connection');
const { GetUserService } = require('../users/get-user.service');

class DeleteImageService {
  static async handler({ id, filename }) {
    const userFound = await GetUserService.handler({ id })

    if (!userFound) {
      throw new Error('User not found');
    }

    try {
      await connection.transaction(async (begin_try) => {
        await begin_try('images').where('url', 'like', `${filename}%`).del();

        await begin_try.commit()
      })
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  DeleteImageService,
};
