const columnTitles = ['CustomerID', 'SeasonID', 'Date', 'Amount']

module.exports = function checkHeaderRow(row, cb) {
  const isArray = Array.isArray(row)
  const hasProperTitles = isArray && row.every(
    (cell) => columnTitles.indexOf(cell) > -1)

  if (isArray && hasProperTitles) {
    return row
  } else {
    cb()
  }
}