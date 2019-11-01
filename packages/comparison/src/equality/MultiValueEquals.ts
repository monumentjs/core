import { Delegate } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.14.0
 */
export type MultiValueEqualsCondition<T> = [T, T, Delegate<[T, T], boolean>];

/**
 * @author Alex Chugaev
 * @since 0.14.0
 */
export function MultiValueEquals(conditions: Array<MultiValueEqualsCondition<any>>) {
  return conditions.every(([x, y, comparator]) => {
    return comparator(x, y);
  });
}
