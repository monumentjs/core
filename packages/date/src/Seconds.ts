import { argument } from '@monument/assert';
import { Comparable, ComparisonResult, Equatable, NumberCompare, StrictEquals } from '@monument/comparison';
import { Duration } from './Duration';

export class Seconds implements Comparable<Seconds>, Comparable<number>, Equatable<Seconds>, Equatable<number> {
  private readonly seconds: number;

  readonly duration: Duration;

  constructor(seconds: number) {
    argument(Number.isSafeInteger(seconds));
    argument(seconds >= 0 && seconds < 60);

    this.seconds = seconds;
    this.duration = Duration.positive(0, 0, 0, seconds);
  }

  compareTo(other: Seconds | number): ComparisonResult {
    const _other: Seconds = typeof other === 'object' ? other : new Seconds(other);

    return NumberCompare(this.seconds, _other.seconds);
  }

  equals(other: Seconds | number): boolean {
    const _other: Seconds = typeof other === 'object' ? other : new Seconds(other);

    return StrictEquals(this.seconds, _other.seconds);
  }

  valueOf(): number {
    return this.seconds;
  }
}
