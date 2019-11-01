import { Delegate } from '@monument/core';
import { ComparisonResult } from './ComparisonResult';

export type MultiValueCompareCondition<T> = [T, T, Delegate<[T, T], ComparisonResult>];

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function MultiValueCompare(conditions: Array<MultiValueCompareCondition<any>>): ComparisonResult {
  for (const [x, y, compare] of conditions) {
    const result: ComparisonResult = compare(x, y);

    if (result !== ComparisonResult.EQUALS) {
      return result;
    }
  }

  return ComparisonResult.EQUALS;
}
