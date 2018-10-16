/**
 * Sorts the target array by using the given sorting function and limits the number of elements by the given limit.
 * @param target Target array to sort and limit.
 * @param sortingFunction Sorting function to use.
 * @param limit Number of elements to keep in target array at max.
 * @param order DESC or ASC.
 */
export function sortAndLimit(target: any[], sortingFunction: (e1: any, e2: any) => number, limit: number, order: string = 'ASC') {
  target.sort(sortingFunction);
  if (order === 'DESC') {
    target.reverse();
  }
  if (target.length > limit) {
    target.splice(limit, target.length - limit);
  }
}
