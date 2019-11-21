const express = require('express');
const fs = require('fs')
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');
const dbHelpers = require('./database/helpers')
const uploadSchema = require('./validationSchemas').uploadSchema
const db = require('better-sqlite3-helper');

db({ path: './database/repaymentInfo.db' }) // this is supposed to determine the path to the db files, but it is not working
const app = express();
const port = process.env.PORT || 3000

app.use(express.static('client'))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let repayments = req.files.repayments;

  readXlsxFile(fs.createReadStream(repayments.tempFilePath), { schema: uploadSchema })
    .then(({ errors, rows }) => {
      if (errors.length > 0) {
        // TODO: test to make sure errors are working properly
        res.end('Error in spreadsheet formatting:', errors)
      }
      console.log('rows', rows)
      const previousState = []
      rows.forEach(({ CustomerID }) => previousState.push(...db().query('SELECT * FROM CustomerSummaries WHERE CustomerID = (?) AND TotalRepaid < TotalCredit ORDER BY SeasonID asc;', CustomerID)
      ))
      console.log('previousState', previousState)

      const newRepaymentRecords = []
      const futureChanges = rows.map((row) => {
        if (row.seasonID) {
          newRepaymentRecords.push(row)
        } else {
          // apply payment to oldest debt first, then more recent if there is money leftover
          const summaryRecords = previousState.filter((record) => record.CustomerID === row.CustomerID)

          const recordsWithDebt = summaryRecords.map((record) => ({ ...record, debt: record.TotalCredit - record.TotalRepaid }))

          let paymentToBeApplied = row.Amount

          for (let i = 0; i < recordsWithDebt.length; i++) {
            const debtRecord = recordsWithDebt[i]

            if (paymentToBeApplied <= debtRecord.debt) {
              newRepaymentRecords.push({
                ...row,
                Amount: paymentToBeApplied,
                SeasonID: debtRecord.SeasonID,
                ParentID: newRepaymentRecords.length - i
              })
              // update future CustomerSummary here or later
              break
            } else if (i === recordsWithDebt.length - 1) {
              // check if debtRecord is same as most recent season's CustomerSummary record
              const customersMostRecentSeason = db().query('SELECT * FROM CustomerSummaries WHERE CustomerID = (?) ORDER BY SeasonID desc LIMIT 1;', debtRecord.CustomerID)[0];

              let debtRecordIsMostRecent = true
              for (let key in customersMostRecentSeason) {
                if (debtRecord[key] !== customersMostRecentSeason[key]) {
                  debtRecordIsMostRecent = false
                }
              }
              if (debtRecordIsMostRecent) {
                // add payment to most recent season
                newRepaymentRecords.push({
                  ...row,
                  Amount: paymentToBeApplied,
                  SeasonID: debtRecord.SeasonID,
                  ParentID: newRepaymentRecords.length - i
                })
                break
              } else {
                // add payment to season with debt and make another transaction adding leftover to most recent
                newRepaymentRecords.push({
                  ...row,
                  Amount: debtRecord.debt,
                  SeasonID: debtRecord.SeasonID,
                  ParentID: newRepaymentRecords.length - i
                })
                paymentToBeApplied -= debtRecord.debt

                newRepaymentRecords.push({
                  ...row,
                  Amount: paymentToBeApplied,
                  SeasonID: customersMostRecentSeason.SeasonID,
                  ParentID: newRepaymentRecords.length - i // TODO
                })
              }
              newRepaymentRecords.push({
                ...row,
                Amount: debtRecord.debt,
                SeasonID: debtRecord.SeasonID,
                ParentID: newRepaymentRecords.length - i
              })
              paymentToBeApplied -= debtRecord.debt

            }
          }
        }
      })
      console.log('newRepaymentRecords', newRepaymentRecords)
      res.json(newRepaymentRecords)
    })
  /*

// send report as list or excel file, no need for fancy ui
// add functions that test output given input if time
// email Paul Mutie when finished

// res.sendFile(repayments.tempFilePath);
*/
});

app.listen(port, () => console.log(`server is listening on port ${port}`))

module.exports = app
