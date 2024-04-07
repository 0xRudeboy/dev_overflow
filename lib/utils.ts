import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);

    return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);

    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);

    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);

    return `${days} ${days === 1 ? "day" : "days"}`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);

    return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);

    return `${months} ${months === 1 ? "month" : "months"}`;
  } else {
    const years = Math.floor(timeDifference / year);

    return `${years} ${years === 1 ? "year" : "years"}`;
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};
// get the javascript date object as a parameter and return a joined date (just a month and year)
export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" }); // Adding 1 since getMonth() returns zero-based index
  const year = date.getFullYear();
  return `${month} ${year}`;
};
