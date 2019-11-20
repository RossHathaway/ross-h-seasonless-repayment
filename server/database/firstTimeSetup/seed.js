const db = require('../index')
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')
const path = require('path')

function readFile(name, schema) {
  return readXlsxFile(fs.createReadStream(path.join(__dirname, `${name}.xlsx`), schema))
}

module.exports = function seedDB() {

  db.parallelize(function () {
    readFile('Customers').then((rows) => {

      const insertCustomer = db.prepare("INSERT INTO Customers(CustomerID, CustomerName) VALUES (?, ?)");

      rows.map((row) => insertCustomer.run(row[0], row[1]))

      insertCustomer.finalize();
    })
    readFile('Seasons').then((rows) => {

      const insertSeason = db.prepare("INSERT INTO Seasons(SeasonID, SeasonName, StartDate) VALUES (?, ?, ?)");

      rows.map((row) => insertSeason.run(row[0], row[1], row[2]))

      insertSeason.finalize();
    })
  })

  readFile('CustomerSummaries').then((rows) => {
    const insertSummary = db.prepare("INSERT INTO CustomerSummaries(CustomerID, SeasonID, TotalRepaid, TotalCredit) VALUES (?, ?, ?, ?)");

    rows.map((row) => insertSummary.run(row[0], row[1], row[2], row[3]))

    insertSummary.finalize();
  })
}