import { ComparisonResult } from '@monument/contracts';

export function PreserveCaseCompare(current: string, other: string): ComparisonResult {
  if (current > other) {
    return ComparisonResult.GREATER;
  }

  if (current < other) {
    return ComparisonResult.LESS;
  }

  return ComparisonResult.EQUALS;
}
