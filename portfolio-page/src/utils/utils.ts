export const sortedByDate = <T extends { start_date: Date }>(items: T[]): T[] => {
  return items.slice().sort((a, b) => {
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  })
}

export const formatDate = (date: Date | undefined, locale: string): string => {
  if (!date) return ''
  const month = date.toLocaleDateString(locale, { month: 'short' }).toUpperCase()
  return `${month} ${date.getFullYear}`
}
