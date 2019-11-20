const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')
const path = require('path')

const db = require('../index')
const validationSchemas = require('../../validationSchemas')
const formatTime = require('../helpers').formatTime

function readFile(sheetName, schema) {
  return readXlsxFile(fs.createReadStream(path.join(__dirname, `./IT Dev Final Interview - Seasonless Repayment.xlsx`)), { schema, sheet: sheetName })
}

const customerStatement = db.prepare("INSERT INTO Customers(CustomerID, CustomerName) VALUES (?, ?)")
const seasonStatement = db.prepare("INSERT INTO Seasons(SeasonID, SeasonName, StartDate) VALUES (?, ?, ?)")
const summaryStatement = db.prepare("INSERT INTO CustomerSummaries(CustomerID, SeasonID, TotalRepaid, TotalCredit) VALUES (?, ?, ?, ?)")

const insertTransaction = db.transaction((statement, params) => statement.run(...params))

const insertRows = ({ errors, rows }, statement, params) => {
  // TODO: error handling
  rows.forEach((row) => insertTransaction(statement, params))
}

module.exports = function seedDB() {
  readFile('Customers', validationSchemas.customerSchema)
    .then((result) => {
      insertRows(result, customerStatement, [row.CustomerID, row.customerName])
    })

  readFile('Seasons', validationSchemas.seasonSchema)
    .then((result) => {
      insertRows(result, seasonStatement, [row.seasonID, row.seasonName, formatTime(row.startDate)])
    })

  readFile('CustomerSummaries', validationSchemas.summarySchema)
    .then((result) => {
      insertRows(result, summaryStatement, [row.customerID, row.seasonID, row.totalRepaid, row.totalCredit])
    })
}
