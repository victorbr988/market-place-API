const { GetCondoService } = require('../../services/condos/get-condo.service');

class GetCondoController {
  static async handler(request, response) {
    const { id: condo_id } = request.params
    try {
      const condo = await GetCondoService.handler({ id: condo_id });

      return response.status(200).json(condo);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  GetCondoController,
};
