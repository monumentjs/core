import {times} from '../function/times';

export class Benchmark {
    public static once(fn: () => void): number {
        const startTime = Date.now();

        fn();

        const endTime = Date.now();

        return (endTime - startTime);
    }

    public static repeat(count: number, fn: (num: number) => void): number {
        const startTime = Date.now();

        times(count, fn);

        const endTime = Date.now();

        return (endTime - startTime);
    }
}
