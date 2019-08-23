import { ComparisonResult } from './ComparisonResult';

export function PreserveCaseCompare(current: string, other: string): ComparisonResult {
  if (current > other) {
    return ComparisonResult.GREATER;
  }

  if (current < other) {
    return ComparisonResult.LESS;
  }

  return ComparisonResult.EQUALS;
}
