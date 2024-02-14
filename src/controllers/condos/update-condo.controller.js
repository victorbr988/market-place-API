const { z } = require('zod');
const { UpdateCondoService } = require('../../services/condos/update-condo.service');

const condo_schema = z.object({
  name: z.string().min(4).max(92),
  description: z.string().min(4).max(255),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

class UpdateCondoController {
  static async handler(request, response) {
    const { id: user_id, role } = request.user
    const { id } = request.params;
    const images = request.files;
    const { name, description, latitude, longitude } = condo_schema.parse(request.body);

    if (role !== 0) {
      return response.status(403).json({ error: 'You are not allowed to update condo' });
    }

    try {
      await UpdateCondoService.handler({
        id,
        name,
        description,
        latitude,
        longitude,
        images,
        user_id
      });

      return response.status(200).json({ message: 'Condo updated' });
    } catch (error) {
      if (error.message === 'User not found or has not permission') {
        return response.status(404).json({ message: error.message });
      }

      throw error;
    }
  }
}

module.exports = {
  UpdateCondoController,
};
