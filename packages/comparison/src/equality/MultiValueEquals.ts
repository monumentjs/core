import { Func2 } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.14.0
 */
export type MultiValueEqualsCondition<T> = [T, T, Func2<T, T, boolean>];

/**
 * @author Alex Chugaev
 * @since 0.14.0
 */
export function MultiValueEquals(conditions: Array<MultiValueEqualsCondition<any>>) {
  return conditions.every(([x, y, comparator]) => {
    return comparator(x, y);
  });
}
