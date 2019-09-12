import { argument } from '@monument/assert';
import {
  Comparable,
  ComparisonResult,
  Equatable,
  NumberCompare,
  StrictEquals
} from '@monument/core';
import { Duration } from './Duration';

export class Hours implements Comparable<Hours>, Comparable<number>, Equatable<Hours>, Equatable<number> {
  private readonly hours: number;

  readonly isAM: boolean;
  readonly isPM: boolean;
  readonly duration: Duration;

  constructor(hours: number) {
    argument(Number.isSafeInteger(hours));
    argument(hours >= 0 && hours < 24);

    this.hours = hours;
    this.isAM = hours < 12;
    this.isPM = hours >= 12;
    this.duration = Duration.positive(0, hours);
  }

  compareTo(other: Hours | number): ComparisonResult {
    const _other: Hours = typeof other === 'object' ? other : new Hours(other);

    return NumberCompare(this.hours, _other.hours);
  }

  equals(other: Hours | number): boolean {
    const _other: Hours = typeof other === 'object' ? other : new Hours(other);

    return StrictEquals(this.hours, _other.hours);
  }

  valueOf(): number {
    return this.hours;
  }
}
