const db = require('./index')

const requiredString = {
  type: String,
  required: true,
}

const requiredNum = {
  type: Number,
  required: true,
}

module.exports = {
  getCustomer: (id, cb) => db.all(`SELECT * FROM Customers WHERE CustomerID = (?)`, [id], (err, rows) => cb(err, rows)),
  getSeason: (id, cb) => db.all(`SELECT * FROM Seasons WHERE SeasonID = (?)`, [id], (err, rows) => cb(err, rows)),
  customerSchema: {
    CustomerID: {
      prop: 'customerId', ...requiredNum
    },
    CustomerName: {
      prop: 'customerName', ...requiredString
    }
  },
  seasonSchema: {
    SeasonId: {
      prop: 'seasonId', ...requiredNum
    },
    SeasonName: {
      prop: 'seasonName', ...requiredString
    },
    StartDate: {
      prop: 'startDate', type: Date, required: true
    },
    EndDate: {
      prop: 'endDate', type: Date
    }
  },
  summarySchema: {
    CustomerID: {
      prop: 'customerId', ...requiredNum
    },
    SeasonId: {
      prop: 'seasonId', ...requiredNum
    },
    TotalRepaid: {
      prop: 'totalRepaid', ...requiredNum
    },
    TotalCredit: {
      prop: 'totalCredit', ...requiredNum
    }
  },
  uploadSchema: {
    CustomerID: {
      prop: 'customerId', ...requiredNum
    },
    SeasonId: {
      prop: 'seasonId', type: Object
    },
    Date: {
      prop: 'date', type: Date, required: true
    },
    Amount: {
      prop: 'amount', ...requiredNum
    }
  },
  repaymentSchema: {
    // TODO
  }
}