const db = require('./index')

module.exports = {
  getCustomer: (id, cb) => db.all(`SELECT * FROM Customers WHERE CustomerID = (?)`, [id], (err, rows) => cb(err, rows)),
  getSeason: (id, cb) => db.all(`SELECT * FROM Seasons WHERE SeasonID = (?)`, [id], (err, rows) => cb(err, rows)),
  formatTime: (date) => {
    const month = date.getMonth() + 1
    const formattedMonth = month < 10 ? `0${month}` : month
    const day = date.getDate()
    const formattedDay = day < 10 ? `0${day}` : day

    return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`
  }
}