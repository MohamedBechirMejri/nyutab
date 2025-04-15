import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToBytes(size: string): number {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8,
  };

  try {
    let [value, unit] = size.split(" ");

    const v = parseFloat(value.replace(",", "."));
    const u = units[unit as keyof typeof units];

    return v * u;
  } catch (e) {
    return 0;
  }
}

/**
 * Format a number to a specific number of decimal places
 * @param value The number to format
 * @param decimalPlaces The number of decimal places to show
 * @returns Formatted number as a string
 */
export function formatToFixed(
  value: number,
  decimalPlaces: number = 2
): string {
  if (isNaN(value)) return "0";
  return value.toFixed(decimalPlaces);
}
