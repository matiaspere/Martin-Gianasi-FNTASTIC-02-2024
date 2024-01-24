import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const BUSINESS = "business";
export const CONSUMER = "consumer";
export const EMPLOYEE = "employee";

export const ENABLED = "enabled";
export const DISABLED = "disabled";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  const formattedAmount = new Intl.NumberFormat("es-ES", options).format(
    amount
  );
  return `$${formattedAmount}`;
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
