const Sqlite = require('sqlite3').verbose()

const db = new Sqlite.Database('repaymentInfo.db', (err) => {
  if (err) console.err(err)
  else console.log('connected to repaymentInfo.db')
})

module.exports = db