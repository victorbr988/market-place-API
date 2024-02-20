const { connection } = require('../../libs/connection');
const { FilterDecorator } = require('../decorators/filter.decorator');

const PER_PAGE = 10;

class GetUsersService {
  static async handler({ page, role, condo_id, search }) {
    const all_users_query = () => connection('users as u')
      .select('u.*')
      .where({ 'u.deleted_at': null }) 
      .orderBy('u.name_clean', 'asc')
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE);

    const total_query_by_all_users = () => connection('users as u')
      .count('u.id', { as: 'total' })
      .where({ 'u.deleted_at': null })
      .first();

    const users_query = new FilterDecorator(all_users_query)
      .filterByCondo('u.condo_id', condo_id)
      .filterByRole('u.role', role)
      .filterByName('u.name',  search)
      .queryResult()

    const total_query = new FilterDecorator(total_query_by_all_users)
      .filterByCondo('u.condo_id', condo_id)
      .filterByRole('u.role', role)
      .filterByName('u.name',  search)
      .queryResult()

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
