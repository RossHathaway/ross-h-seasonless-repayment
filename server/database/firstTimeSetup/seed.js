const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')
const path = require('path')

const db = require('../index')
const validationSchemas = require('../../validationSchemas')
const formatTime = require('../helpers').formatTime

function readFile(sheetName, schema) {
  return readXlsxFile(fs.createReadStream(path.join(__dirname, `./IT Dev Final Interview - Seasonless Repayment.xlsx`)), { schema, sheet: sheetName })
}

module.exports = function seedDB() {

  db.parallelize(function () {
    // TODO: error handling
    readFile('Customers', validationSchemas.customerSchema)
      .then(({ errors, rows }) => {
        const insertCustomer = db.prepare("INSERT INTO Customers(CustomerID, CustomerName) VALUES (?, ?)");

        rows.forEach((row) => insertCustomer.run(row.CustomerID, row.customerName))

        insertCustomer.finalize();
      })

    readFile('Seasons', validationSchemas.seasonSchema)
      .then(({ errors, rows }) => {
        const insertSeason = db.prepare("INSERT INTO Seasons(SeasonID, SeasonName, StartDate) VALUES (?, ?, ?)");
        rows.forEach((row) => {
          insertSeason.run(row.seasonID, row.seasonName, formatTime(row.startDate)
          )
        })

        insertSeason.finalize();
      })

    readFile('CustomerSummaries', validationSchemas.summarySchema)
      .then(({ errors, rows }) => {
        const insertSummary = db.prepare("INSERT INTO CustomerSummaries(CustomerID, SeasonID, TotalRepaid, TotalCredit) VALUES (?, ?, ?, ?)");

        rows.forEach((row) => {
          insertSummary.run(row.customerID, row.seasonID, row.totalRepaid, row.totalCredit)
        })

        insertSummary.finalize();
      })
  })
}
