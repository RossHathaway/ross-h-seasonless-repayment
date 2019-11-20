const db = require('../index')
const createScript = require('./create.js')
const seed = require('./seed')

  db.exec(createScript)
  seed()

db.close();
