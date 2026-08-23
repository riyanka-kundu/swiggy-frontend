import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const formatDay = (day: string) => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};

export const formatTime = (time?: string | null) => {
  if (!time) {
    return "—";
  }

  const parts = time.split(":");

  if (parts.length < 2) {
    return time;
  }

  const hours = Number(parts[0]);
  const minutes = parts[1];

  if (Number.isNaN(hours)) {
    return time;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${formattedHour}:${minutes} ${period}`;
};

export const formatDate = (date?: Date | string | null) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

export const maskAccountNumber = (accountNumber?: string | null) => {
  if (!accountNumber) {
    return "Not provided";
  }

  if (accountNumber.length <= 4) {
    return accountNumber;
  }

  return `•••• •••• ${accountNumber.slice(-4)}`;
};


export const buildImageUrl = (imagePath: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${imagePath}`;
};

export const formatPrice = (price: number | string | null | undefined) => {
  if (price == null) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
};