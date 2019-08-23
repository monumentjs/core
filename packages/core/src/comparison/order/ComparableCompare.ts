import { Comparable } from './Comparable';
import { ComparisonResult } from './ComparisonResult';

export function ComparableCompare<T extends Comparable<T>>(x: T, y: T): ComparisonResult {
  return x.compareTo(y);
}
