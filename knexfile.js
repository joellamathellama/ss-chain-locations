const path = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
    	host: 'localhost',
    	port: '5432',
      database: 'ss_dev'
    },
    migrations: {
      directory: path.join(__dirname + '/migrations')
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname + '/migrations')
    }
  }
}
