import { times } from '@monument/core';

export class Benchmark {
  static once(fn: () => void): number {
    const startTime = Date.now();

    fn();

    const endTime = Date.now();

    return endTime - startTime;
  }

  static repeat(count: number, fn: (num: number) => void): number {
    const startTime = Date.now();

    times(count, fn);

    const endTime = Date.now();

    return endTime - startTime;
  }
}
