const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')
const path = require('path')

const db = require('better-sqlite3-helper')
const validationSchemas = require('../../validationSchemas')
const formatTime = require('../helpers').formatTime

function readFile(sheetName, schema) {
  return readXlsxFile(
    fs.createReadStream(path.join(__dirname, `./IT Dev Final Interview - Seasonless Repayment.xlsx`)),
    {
      schema,
      sheet: sheetName,
      transformData(data) {
        return data.map((row) => row.map((cell) => cell instanceof Date ? formatTime(cell) : cell))
      }
    })
}

const customerStatement = db().prepare("INSERT INTO Customers(CustomerID, CustomerName) VALUES (@customerID, @customerName)")
// const seasonStatement = db().prepare("INSERT INTO Seasons(SeasonID, SeasonName, StartDate) VALUES (SeasonID, SeasonName, StartDate, EndDate)")
// const summaryStatement = db().prepare("INSERT INTO CustomerSummaries(CustomerID, SeasonID, TotalRepaid, TotalCredit) VALUES (@CustomerID, @SeasonID, @TotalRepaid, @TotalCredit)")

const transaction = db().transaction((statement, row) => {
  statement.run(row.CustomerID, row.customerName)
})
// const seasonTransaction = db().transaction((statement, row) => statement.run(row.CustomerID, row.customerName))
// const summaryTransaction = db().transaction((statement, row) => statement.run(row.CustomerID, row.customerName))


// TODO: error handling
readFile('Customers', validationSchemas.customerSchema)
  .then(({ errors, rows }) => {
    rows.forEach((row) => {
      transaction(customerStatement, row)
    })
  })

// readFile('Seasons', validationSchemas.seasonSchema)
//   .then(({ errors, rows }) => {
//     rows.forEach((row) => transaction(seasonStatement, row))
//   })

// readFile('CustomerSummaries', validationSchemas.summarySchema)
//   .then(({ errors, rows }) => {
//     rows.forEach((row) => transaction(summaryStatement, row))
//   })
