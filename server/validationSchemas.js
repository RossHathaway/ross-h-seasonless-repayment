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
      prop: 'customerID', ...requiredNum
    },
    CustomerName: {
      prop: 'customerName', ...requiredString
    }
  },
  seasonSchema: {
    SeasonID: {
      prop: 'seasonID', ...requiredNum
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
      prop: 'customerID', ...requiredNum
    },
    SeasonID: {
      prop: 'seasonID', ...requiredNum
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
      prop: 'customerID', ...requiredNum
    },
    SeasonID: {
      prop: 'seasonID', type: Number
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