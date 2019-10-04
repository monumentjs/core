import { ComparisonResult } from './ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function NumberCompare(x: number, y: number): ComparisonResult {
  if (x > y) {
    return ComparisonResult.GREATER;
  }

  if (x < y) {
    return ComparisonResult.LESS;
  }

  return ComparisonResult.EQUALS;
}
