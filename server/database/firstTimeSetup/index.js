const db = require('../index')
const createScript = require('./create.js')
const seed = require('./seed')

db.serialize(function createAndSeedDB() {
  db.exec(createScript)
  seed()
})

db.close();
