const { createId } = require('@paralleldrive/cuid2');

class MiscController {
  static async handler(request, response) {
    return response.json({
      id: createId(),
    });
  }
}

module.exports = {
  MiscController,
};
