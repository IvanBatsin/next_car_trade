import { getAsString } from "./toString"

export const toStringOrNull = (value: string | string[]): string | null => {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? null : str;
}

export const toNumberOrNull = (value: string | string[]): number | null => {
  const str = getAsString(value);
  return isNaN(Number(str)) ? null : Number(str);
}