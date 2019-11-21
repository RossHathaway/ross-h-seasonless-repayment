const requiredString = {
  type: String,
  required: true,
}

const requiredNum = {
  type: Number,
  required: true,
}

module.exports = {
  customerSchema: {
    CustomerID: {
      prop: 'CustomerID', ...requiredNum
    },
    CustomerName: {
      prop: 'CustomerName', ...requiredString
    }
  },
  seasonSchema: {
    SeasonID: {
      prop: 'SeasonID', ...requiredNum
    },
    SeasonName: {
      prop: 'SeasonName', ...requiredString
    },
    StartDate: {
      prop: 'StartDate', type: Date, required: true
    },
    EndDate: {
      prop: 'EndDate', type: Date
    }
  },
  summarySchema: {
    CustomerID: {
      prop: 'CustomerID', ...requiredNum
    },
    SeasonID: {
      prop: 'SeasonID', ...requiredNum
    },
    TotalRepaid: {
      prop: 'TotalRepaid', ...requiredNum
    },
    TotalCredit: {
      prop: 'TotalCredit', ...requiredNum
    }
  },
  uploadSchema: {
    CustomerID: {
      prop: 'CustomerID', ...requiredNum
    },
    SeasonID: {
      prop: 'SeasonID', type: Number
    },
    Date: {
      prop: 'Date', type: Date, required: true
    },
    Amount: {
      prop: 'Amount', ...requiredNum
    }
  },
  repaymentSchema: {
    // TODO
  }
}