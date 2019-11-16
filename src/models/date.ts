const monthShort = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
]

// shortDate returns the date in the form `Jan 18`
export function shortDate (dateStr: string): string {
  const dateObj = new Date(dateStr)
  const month = monthShort[dateObj.getMonth()]
  const year = `${dateObj.getFullYear()}`.substring(2)
  return `${month} '${year}`
}
