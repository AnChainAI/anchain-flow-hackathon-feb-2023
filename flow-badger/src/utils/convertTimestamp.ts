export const convertTimestamp = (timestamp: string) => {
  const timestampInt = parseInt(timestamp.split('.')[0])
  const date = new Date(timestampInt * 1000)
  return date.toLocaleDateString()
}
