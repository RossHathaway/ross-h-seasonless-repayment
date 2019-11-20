const express = require('express');
// const compression = require('compression');
// const cors = require('cors');
// const morgan = require('morgan');
const fs = require('fs')
// const path = require('path');
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');
const dbHelpers = require('./database/helpers')
const uploadSchema = require('./validationSchemas').uploadSchema
const db = require('./database/index')

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

      let retrievedSummaries
      // console.log(dbHelpers.getRelevantCustomerSummaries(rows))
      dbHelpers.getRelevantCustomerSummaries(rows)
        .then((summaries) => {
          console.log('summaries in .then', summaries)
          relevantSummaries = summaries
          res.end(summaries)
        })
        .catch((error) => res.end('Error: could not get relevant customer summary data from database', error))

      // make records of what to apply before changing database
      // if seasonID specified in uploaded rows, apply to that season only 

      // otherwise, 
      // if debt, apply to oldest season with debt, then cascade

      // If a client does NOT have outstanding credit in a later season, or does NOT have outstanding credit in ANY season, then NO adjustment repayments are made, and the full amount is applied to the client’s most recent season.

    })
  /*

  // send report as list or excel file, no need for fancy ui
  // add functions that test output given input if time
  // email Paul Mutie when finished

output a list of (Repayments) for the correct client, season, and amount for each repayment, and this list should be inclusive of any adjustments repayments that must be made. Additionally, every adjustment repayment should be associated back to the original repayment.
Basic interface - The interface should display the state of the application’s data before the repayment upload, and the interface should display the state of the application’s data after the repayment upload; this display should be inclusive of any adjustment repayments that must be made. 

If a client starts out with 2 seasons of outstanding credit (debt):

CustomerSummary (Client owes 20)
Season = 2011
TotalRepaid = 80
TotalCredit = 100

CustomerSummary (Client owes 90)
Season = 2012
TotalRepaid = 30
TotalCredit = 120

When the client makes a payment of 60, we would expect to save 3 repayment records:

Repaymend record #1 - Season = 2011, Amount = +60 - original repayment record
Repayment record #2 - Season = 2011, Amount = -40 - adjustment repayment record
Repayment record #3 - Season = 2012, Amount = +40 - adjustment repayment record

And we would also expect to see updated customer summaries:

CustomerSummary (Client owes 0)
Season = 2011
TotalRepaid = 100
TotalCredit = 100

CustomerSummary (Client owes 50)
Season = 2012
TotalRepaid = 70
TotalCredit = 120

*/

  // res.sendFile(repayments.tempFilePath);
});


app.listen(port, () => console.log(`server is listening on port ${port}`))

module.exports = app;
