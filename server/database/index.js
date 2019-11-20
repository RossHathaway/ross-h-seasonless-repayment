const Database = require('better-sqlite3');
const db = new Database('repaymentInfo.db', { verbose: console.log });

module.exports = db