/**
 * Move an array item down to one index if possible.
 */
export function moveDown(array: Array<unknown>, index: number) {
  if (!array.length) return;
  array.splice(index + 1, 0, array.splice(index, 1)[0]);
}

/**
 * Move an array item up to one index if possible.
 */
export function moveUp(array: Array<unknown>, index: number) {
  if (index === 0) return;
  array.splice(index - 1, 0, array.splice(index, 1)[0]);
}

/**
 * Remove an array item given its index.
 */
export function remove(array: Array<unknown>, index: number) {
  if (index < 0 || index >= array.length) return;
  array.splice(index, 1);
}
