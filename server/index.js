const express = require('express');
// const compression = require('compression');
// const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
// const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/carousel.db');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3000


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
  // console.log('file:', repayments.name)
  // repayments.mv(`../repayments/${repayments.name}`, function (err) {
  //   if (err)
  //     return res.status(500).send(err);

  //   });
  res.sendFile(repayments.tempFilePath);
});


app.listen(port, () => console.log(`server is listening on port ${port}`))


module.exports = app;
