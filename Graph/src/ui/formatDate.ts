interface Intervals {
  [key: string]: number;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: Intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const interval in intervals) {
    if (Object.prototype.hasOwnProperty.call(intervals, interval)) {
      const value = Math.floor(diffInSeconds / intervals[interval]);
      if (value >= 1) {
        return value === 1 ? `1 ${interval} ago` : `${value} ${interval}s ago`;
      }
    }
  }

  return "Just now";
}
