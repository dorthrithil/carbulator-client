/**
 * Get a HEX color that signals a severity (green to red). The severity is calculated based on the target number with respect to
 * the min possible and max possible value.
 * @param target Target number to get a color for.
 * @param min Min possible value. Everything below will be green.
 * @param max Max possible value. Everything above will be red.
 * @param direction If direction is "up" low values will be green, high values will be red. If "down" the other way round.
 * @return Color as HEX string.
 */
export function getSeverityColor(target: number, min = 0, max = 1000, direction = 'up'): string {
  const severities = [
    '#318700',
    '#FAC400',
    '#F57600',
    '#C92100'
  ];
  // Reverse severities if the direction is the other way round
  if (direction === 'down') {
    severities.reverse();
  }
  // Calculate step size
  let negativeFix = 0;
  if (min < 0) {
    negativeFix = -min;
  }
  const step = (max - min + negativeFix) / 4;
  // Return colors
  if (target <= min + step) {
    return severities[0];
  }
  if (target <= min + step * 2) {
    return severities[1];
  }
  if (target <= min + step * 3) {
    return severities[2];
  }
  return severities[3];
}
