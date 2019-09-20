import { Ordered, ComparisonResult } from '@monument/contracts';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function PriorityCompare(x: Ordered, y: Ordered): ComparisonResult {
  if (x.order > y.order) {
    return ComparisonResult.GREATER;
  }

  if (x.order < y.order) {
    return ComparisonResult.LESS;
  }

  return ComparisonResult.EQUALS;
}
