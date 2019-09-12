import { argument } from '@monument/assert';
import {
  Comparable,
  ComparisonResult,
  Equatable,
  NumberCompare,
  StrictEquals
} from '@monument/core';
import { Duration } from './Duration';

export class Milliseconds implements Comparable<Milliseconds>, Comparable<number>, Equatable<Milliseconds>, Equatable<number> {
  private readonly milliseconds: number;

  readonly duration: Duration;

  constructor(milliseconds: number) {
    argument(Number.isSafeInteger(milliseconds));
    argument(milliseconds >= 0 && milliseconds < 1000);

    this.milliseconds = milliseconds;
    this.duration = Duration.positive(0, 0, 0, 0, milliseconds);
  }

  compareTo(other: Milliseconds | number): ComparisonResult {
    const _other: Milliseconds = typeof other === 'object' ? other : new Milliseconds(other);

    return NumberCompare(this.milliseconds, _other.milliseconds);
  }

  equals(other: Milliseconds | number): boolean {
    const _other: Milliseconds = typeof other === 'object' ? other : new Milliseconds(other);

    return StrictEquals(this.milliseconds, _other.milliseconds);
  }

  valueOf(): number {
    return this.milliseconds;
  }
}
