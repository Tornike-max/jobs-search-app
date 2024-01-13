export function calculateEndDate(startDate: string, daysToAdd: number): string {
  const date = new Date(startDate);
  date.setDate(date.getDate() + daysToAdd);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
