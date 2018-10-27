/**
 * Converts an input variable to a number - even if it's with comma separated decimals.
 * @param input Input string.
 * @return Converted number.
 */
export function toNumber(input: any): number {
  if (input === null) {
    return 0;
  }
  if (typeof input === 'undefined') {
    return 0;
  }
  if (typeof  input === 'number') {
    return input;
  }
  if (typeof input === 'boolean') {
    if (input) {
      return 1;
    } else {
      return 0;
    }
  }
  return Number(input.replace(',', '.'));
}
