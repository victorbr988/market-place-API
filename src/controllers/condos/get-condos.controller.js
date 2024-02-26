const { GetCondosService } = require('../../services/condos/get-condos.service');

class GetCondosController {
  static async handler(_request, response) {
    try {
      const condos = await GetCondosService.handler();

      return response.status(200).json(condos);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

module.exports = {
  GetCondosController,
};
