import { Duration } from './Duration';

export class TimeSpan {
  static fromDays(days: number): TimeSpan {
    return new TimeSpan(days, 0, 0, 0, 0);
  }

  static fromHours(hours: number): TimeSpan {
    return new TimeSpan(0, hours, 0, 0, 0);
  }

  static fromMinutes(minutes: number): TimeSpan {
    return new TimeSpan(0, 0, minutes, 0, 0);
  }

  static fromSeconds(seconds: number): TimeSpan {
    return new TimeSpan(0, 0, 0, seconds, 0);
  }

  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;

  readonly duration: Duration;

  constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;
    this.duration = Duration.positive(days, hours, minutes, seconds, milliseconds);
  }
}
