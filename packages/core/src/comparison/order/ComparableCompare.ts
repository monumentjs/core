import { Comparable, ComparisonResult } from '@monument/contracts';

export function ComparableCompare<T extends Comparable<T>>(x: T, y: T): ComparisonResult {
  return x.compareTo(y);
}
