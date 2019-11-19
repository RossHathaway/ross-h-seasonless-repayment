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
app.use(fileUpload());
// app.use(compression());
// app.use(cors());
// app.use(morgan('dev'));


app.post('/upload', function (req, res) {
  let repayments = req.files.repayments;

  repayments.mv(`../repayments/${repayments.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});


app.listen(port, () => console.log(`server is listening on port ${port}`))


module.exports = app;
