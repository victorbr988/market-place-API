class DeleteSessionController {
  static async handler(request, response) {
    return response
      .cookie('token', '', {
        path: '/',
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
      })
      .json({ message: 'Session deleted successfully' });
  }
}

module.exports = {
  DeleteSessionController,
};
