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

export function formatDateForChat(date: Date): string {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();

  // Check if the message was sent less than 60 seconds ago
  if (timeDiff < 60000) {
    // 60 seconds in milliseconds
    return 'Now';
  } else if (timeDiff < 86400000) {
    // 24 hours in milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert the hours from 24-hour to 12-hour format
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Create a string with the formatted time and AM/PM
    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return timeString;
  } else {
    // Get the month, day, and year from the date
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Create a string with the formatted date
    const dateString = `${month} ${day}, ${year}`;

    // Determine if it's AM or PM
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    // Format the hours and minutes with leading zeros if needed
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Create a string with the formatted time and AM/PM
    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Combine the date and time strings into a final formatted string
    const formattedDate = `${dateString} at ${timeString}`;

    return formattedDate;
  }
}
