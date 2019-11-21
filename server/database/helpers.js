const db = require('better-sqlite3-helper')

module.exports = {
  getRelevantCustomerSummaries: (uploadedRows) => {

    const findSummaries = db().prepare('SELECT * FROM CustomerSummaries WHERE CustomerID = (?) AND TotalRepaid < TotalCredit ORDER BY SeasonID asc;')

    const relevantSummaries = uploadedRows.map(({ customerID }) => {
      new Promise((resolve, reject) => {
        const summaries = []
        const handleSummary = (err, summary) => {
          if (err) {
            reject(err)
          } else {
            summaries.push(summary)
          }
        }
        const onRowCompletion = (err) => {
          if (err) {
            reject(err)
          } else {
            console.log('summaries in onRowCompletion', summaries)
            resolve(summaries)
          }
        }
        findSummaries.each(customerID, handleSummary, onRowCompletion)
      })
    })
    // console.log(Promise.all(relevantSummaries))
    return Promise.all(relevantSummaries)
    // .then(findSummaries.finalize())
  },
  formatTime: (date) => {
    const month = date.getMonth() + 1
    const formattedMonth = month < 10 ? `0${month}` : month
    const day = date.getDate()
    const formattedDay = day < 10 ? `0${day}` : day

    return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`
  }
}