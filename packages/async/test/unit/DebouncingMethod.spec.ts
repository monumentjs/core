import { Case } from '../../../../test-drive/Decorators/Case';
import { DebouncingMethod } from '../../main/decorators/support/DebouncingMethod';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { MethodCallEdge } from '../../main/decorators/support/MethodCallEdge';
import { AsyncUtils } from '../../main/AsyncUtils';


const TEST_ARGUMENTS = [1, 2, 3];

@Test()
export class DebouncingMethodSpec {

    @Case()
    public 'constructor() creates method calling on leading edge by default'() {
        let fn = jest.fn();
        let method: DebouncingMethod = new DebouncingMethod(fn, 100);

        expect(method.delay).toBe(100);
        expect(method.maxWait).toBe(Infinity);
        expect(method.canCallOnLeadingEdge).toBe(true);
        expect(method.canCallOnTrailingEdge).toBe(false);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public 'constructor() creates method calling on leading edge'() {
        let fn = jest.fn();
        let method: DebouncingMethod = new DebouncingMethod(fn, 100, MethodCallEdge.Leading);

        expect(method.delay).toBe(100);
        expect(method.maxWait).toBe(Infinity);
        expect(method.canCallOnLeadingEdge).toBe(true);
        expect(method.canCallOnTrailingEdge).toBe(false);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public 'constructor() creates method calling on trailing edge'() {
        let fn = jest.fn();
        let method: DebouncingMethod = new DebouncingMethod(fn, 100, MethodCallEdge.Trailing);

        expect(method.delay).toBe(100);
        expect(method.maxWait).toBe(Infinity);
        expect(method.canCallOnLeadingEdge).toBe(false);
        expect(method.canCallOnTrailingEdge).toBe(true);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public 'constructor() creates method calling on leading and trailing edges'() {
        let fn = jest.fn();
        let method: DebouncingMethod = new DebouncingMethod(fn, 100, MethodCallEdge.Both);

        expect(method.delay).toBe(100);
        expect(method.maxWait).toBe(Infinity);
        expect(method.canCallOnLeadingEdge).toBe(true);
        expect(method.canCallOnTrailingEdge).toBe(true);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public async 'call() skips too rapid calls'() {
        {
            // leading only

            let fn = jest.fn();
            let method: DebouncingMethod = new DebouncingMethod(fn, 10, MethodCallEdge.Leading);

            method.call(null, TEST_ARGUMENTS);
            method.call({}, TEST_ARGUMENTS);
            method.call([], TEST_ARGUMENTS);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(method.isThrottling).toBe(true);

            await AsyncUtils.wait(20);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(method.isThrottling).toBe(false);
        }


        {
            // trailing only

            let fn = jest.fn();
            let method: DebouncingMethod = new DebouncingMethod(fn, 10, MethodCallEdge.Trailing);

            method.call(null, TEST_ARGUMENTS);
            method.call({}, TEST_ARGUMENTS);
            method.call([], TEST_ARGUMENTS);

            expect(fn).toHaveBeenCalledTimes(0);
            expect(method.isThrottling).toBe(true);

            await AsyncUtils.wait(20);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
            expect(method.isThrottling).toBe(false);
        }


        {
            // leading and trailing

            let fn = jest.fn();
            let method = new DebouncingMethod(fn, 10, MethodCallEdge.Both);

            method.call(null, TEST_ARGUMENTS);
            method.call({}, TEST_ARGUMENTS);
            method.call([], TEST_ARGUMENTS);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(method.isThrottling).toBe(true);

            await AsyncUtils.wait(20);

            expect(fn).toHaveBeenCalledTimes(2);
            expect(method.isThrottling).toBe(false);
        }
    }


    @Case()
    public async 'call() returns return value of last execution'() {
        {
            // leading only

            let fn = jest.fn((x: number, y: number): number => {
                return x + y;
            });

            let method: DebouncingMethod = new DebouncingMethod(fn, 10, MethodCallEdge.Leading);

            expect(method.call(null, [1, 2])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            expect(method.call(null, [3, 4])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            expect(method.call(null, [5, 6])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            await AsyncUtils.wait(20);

            expect(method.isThrottling).toBe(false);
            expect(fn).toHaveBeenCalledTimes(1);

            expect(method.call(null, [7, 8])).toBe(15);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(2);
        }


        {
            // trailing only

            let fn = jest.fn((x: number, y: number): number => {
                return x + y;
            });

            let method: DebouncingMethod = new DebouncingMethod(fn, 10, MethodCallEdge.Trailing);

            expect(method.call(null, [1, 2])).toBeUndefined();

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(0);

            expect(method.call(null, [3, 4])).toBeUndefined();

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(0);

            expect(method.call(null, [5, 6])).toBeUndefined();

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(0);

            await AsyncUtils.wait(20);

            expect(method.isThrottling).toBe(false);

            expect(method.call(null, [7, 8])).toBe(11);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);
        }

        {
            // leading and trailing

            let fn = jest.fn((x: number, y: number): number => {
                return x + y;
            });

            let method: DebouncingMethod = new DebouncingMethod(fn, 10, MethodCallEdge.Both);

            expect(method.call(null, [1, 2])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            expect(method.call(null, [3, 4])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            expect(method.call(null, [5, 6])).toBe(3);

            expect(method.isThrottling).toBe(true);
            expect(fn).toHaveBeenCalledTimes(1);

            await AsyncUtils.wait(20);

            expect(method.isThrottling).toBe(false);
            expect(fn).toHaveBeenCalledTimes(2);

            expect(method.call(null, [7, 8])).toBe(15);

            expect(method.isThrottling).toBe(true);
        }
    }


    public async 'call() debouncing'() {
        {
            // leading only

            {
                // without max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Leading);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(25);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
            }

            {
                // with max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Leading, 40);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 15 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 30 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 45 ms elapsed

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
            }
        }

        {
            // trailing only

            {
                // without max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Trailing);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(15);                  // 15 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(25);                  // 40 ms elapsed

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
            }


            {
                // with max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Trailing, 40);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(15);                  // 15 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(15);                  // 30 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(15);                  // 45 ms elapsed

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
            }
        }

        {
            // leading and trailing

            {
                // without max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Both);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);                  // 10 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);                  // 20 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(10);                  // 30 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(25);                  // 55 ms elapsed

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(2);
            }

            {
                // with max delay

                let fn = jest.fn();
                let method = new DebouncingMethod(fn, 20, MethodCallEdge.Both, 40);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(0);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 15 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 30 ms elapsed

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                method.call(null, TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);

                await AsyncUtils.wait(15);                  // 45 ms elapsed

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(2);
            }
        }
    }
}
