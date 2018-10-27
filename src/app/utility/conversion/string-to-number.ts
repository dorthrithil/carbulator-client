/**
 * Converts a string to a number - even if it's with comma separated decimals.
 * @param input Input string.
 * @return Converted number.
 */
export function stringToNumber(input: string): number {
  return Number(input.replace(',', '.'));
}
