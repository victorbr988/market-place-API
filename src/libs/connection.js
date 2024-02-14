const knex = require('knex');
const { config } = require('../database/config');

const connection = knex(config[process.env.NODE_ENV ?? 'development']);

module.exports = {
  connection,
};
