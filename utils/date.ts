function getSecondsAgo(timestampMs: number, now: Date): number {
  return Math.floor((now.getTime() - timestampMs) / 1000);
}

function getTimeDifferenceString(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'} ago`;
}

export function getTimeDifference(timestamp: Date | number | string) {
  const now = new Date();
  const timestampMs = new Date(timestamp).getTime();
  const seconds = getSecondsAgo(timestampMs, now);

  if (seconds < 60) {
    return 'now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return getTimeDifferenceString(minutes, 'minute');
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return getTimeDifferenceString(hours, 'hour');
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return getTimeDifferenceString(days, 'day');
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return getTimeDifferenceString(weeks, 'week');
  }

  const months = Math.floor(weeks / 4);
  if (months < 12) {
    return getTimeDifferenceString(months, 'month');
  }

  const years = Math.floor(months / 12);
  return getTimeDifferenceString(years, 'year');
}
