import { ComparisonResult } from '@monument/contracts';

export function IgnoreCaseCompare(current: string, other: string): ComparisonResult {
  const _current = current.toLowerCase();
  const _other = other.toLowerCase();

  if (_current > _other) {
    return ComparisonResult.GREATER;
  }

  if (_current < _other) {
    return ComparisonResult.LESS;
  }

  return ComparisonResult.EQUALS;
}
