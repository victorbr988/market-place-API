const { connection } = require('../../libs/connection');

const PER_PAGE = 10;

class GetUsersService {
  static async handler({ page }) {
    const users_query = connection('users as u')
      .select('u.*')
      .where({ 'u.deleted_at': null })
      .orderBy('u.name_clean', 'asc')
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE);

    const total_query = connection('users as u')
      .count('u.id', { as: 'total' })
      .where({ 'u.deleted_at': null })
      .first();

    const [users, total] = await Promise.all([users_query, total_query]);

    return {
      page,
      total: parseInt(total.total),
      total_pages: Math.ceil(total.total / PER_PAGE),
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        created_at: user.created_at,
      })),
    };
  }
}

module.exports = {
  GetUsersService,
};
