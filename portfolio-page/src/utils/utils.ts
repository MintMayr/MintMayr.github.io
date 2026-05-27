
export const sortedByDate = (items: any[]) => {
  return items.slice().sort((a, b) => {
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
  });
};

export const formatDate = (date?: Date) => {
  if (!date) return 'PRESENT';
  const month = date.toLocaleDateString('en-US', {month: 'short' }).toUpperCase();
  const year= date.getFullYear().toString();
  return `${month} ${year}`;
};
