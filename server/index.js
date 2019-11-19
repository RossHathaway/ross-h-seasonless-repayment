const express = require('express');
// const compression = require('compression');
// const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3007
// const sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./db/carousel.db');

const app = express();

// app.use(compression());
// app.use(cors());
// app.use(morgan('dev'));

// app.use(express.static('public'))

app.post('/upload', function (req, res) {
  console.log(req.files.foo); // the uploaded file object
  /*
req.files.foo.name: "car.jpg"
req.files.foo.mv: A function to move the file elsewhere on your server
req.files.foo.mimetype: The mimetype of your file
req.files.foo.data: A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true.
req.files.foo.tempFilePath: A path to the temporary file in case useTempFiles option was set to true.
req.files.foo.truncated: A boolean that represents if the file is over the size limit
req.files.foo.size: Uploaded size in bytes
req.files.foo.md5: MD5 checksum of the uploaded file
  */
});


app.listen(port, () => console.log(`server is listening on port ${port}`))


module.exports = app;
