const express = require('express');
// const compression = require('compression');
// const cors = require('cors');
// const morgan = require('morgan');
const fs = require('fs')
const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/carousel.db');
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');

const app = express();
const port = process.env.PORT || 3000
const columnTitles = ['CustomerID', 'SeasonID', 'Date', 'Amount']

app.use(express.static('client'))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
// app.use(compression());
// app.use(cors());
// app.use(morgan('dev'));


app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let repayments = req.files.repayments;

  readXlsxFile(fs.createReadStream(repayments.tempFilePath))
    .then((rows) => {
      console.log(rows)
      let headerRow

      for (let i = 0; i < rows.length; i++) {
        const currentRow = rows[i]

        if (!Array.isArray(currentRow)) res.end(`Please upload an excel .xslx doc with all required columns and titles for each column from the following list: ${columnTitles}`)

        // check to make sure there is a header row with proper headers and save it for future reference
        if (i === 0) {
          if (!currentRow.every(
            (cell) => columnTitles.indexOf(cell) > -1)) {
            res.end(`Please upload an excel .xslx doc with all required columns and titles for each column from the following list: ${columnTitles}`)
          }
          headerRow = currentRow
        } else {

          // compare with appropriate rows in db
          // save 
          // send report
        }
      }
    })

  // res.sendFile(repayments.tempFilePath);
  res.end()
});




app.listen(port, () => console.log(`server is listening on port ${port}`))


module.exports = app;
