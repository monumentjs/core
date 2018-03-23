import { Case } from '../../../../test-drive/Decorators/Case';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { ThrottlingMethod } from '../../main/decorators/support/ThrottlingMethod';
import { MethodCallEdge } from '../../main/decorators/support/MethodCallEdge';
import { AsyncUtils } from '../../main/AsyncUtils';


const TEST_ARGUMENTS = [1, 2, 3];


@Test()
export class ThrottlingMethodSpec {

    @Case()
    public 'constructor() creates new instance'() {
        let fn = jest.fn();
        let method: ThrottlingMethod = new ThrottlingMethod(fn, 100);

        expect(method.delay).toBe(100);
        expect(method.canCallOnLeadingEdge).toBe(true);
        expect(method.canCallOnTrailingEdge).toBe(false);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public 'constructor() create new instance'() {
        let fn = jest.fn();
        let method: ThrottlingMethod = new ThrottlingMethod(fn, 100);

        expect(method.delay).toBe(100);
        expect(method.canCallOnLeadingEdge).toBe(true);
        expect(method.canCallOnTrailingEdge).toBe(false);
        expect(method.isThrottling).toBe(false);
        expect(fn).toHaveBeenCalledTimes(0);
    }


    @Case()
    public async 'call()'() {
        {
            // skips too rapid calls
            {
                // leading only

                let fn = jest.fn();
                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Leading);

                method.call(null, TEST_ARGUMENTS);
                method.call({}, TEST_ARGUMENTS);
                method.call([], TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);
                expect(fn).toHaveBeenLastCalledWith(...TEST_ARGUMENTS);

                await AsyncUtils.wait(20);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
                expect(fn).toHaveBeenLastCalledWith(...TEST_ARGUMENTS);
            }

            {
                // trailing only
                let fn = jest.fn();
                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Trailing);

                method.call(null, TEST_ARGUMENTS);
                method.call({}, TEST_ARGUMENTS);
                method.call([], TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(0);

                await AsyncUtils.wait(20);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(1);
                expect(fn).toHaveBeenLastCalledWith(...TEST_ARGUMENTS);
            }

            {
                // leading and trailing

                let fn = jest.fn();
                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Both);

                method.call(null, TEST_ARGUMENTS);
                method.call({}, TEST_ARGUMENTS);
                method.call([], TEST_ARGUMENTS);

                expect(method.isThrottling).toBe(true);
                expect(fn).toHaveBeenCalledTimes(1);
                expect(fn).toHaveBeenLastCalledWith(...TEST_ARGUMENTS);

                await AsyncUtils.wait(20);

                expect(method.isThrottling).toBe(false);
                expect(fn).toHaveBeenCalledTimes(2);
                expect(fn).toHaveBeenLastCalledWith(...TEST_ARGUMENTS);
            }
        }


        {
            // returns return value of last execution

            {
                // leading only

                let fn = jest.fn((x: number, y: number): number => {
                    return x + y;
                });

                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Leading);

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
                expect(fn).toHaveBeenLastCalledWith(1, 2);
            }

            {
                // trailing only

                let fn = jest.fn((x: number, y: number): number => {
                    return x + y;
                });

                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Trailing);

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
                expect(fn).toHaveBeenLastCalledWith(5, 6);
            }

            {
                // leading and trailing

                let fn = jest.fn((x: number, y: number): number => {
                    return x + y;
                });

                let method: ThrottlingMethod = new ThrottlingMethod(fn, 10, MethodCallEdge.Both);

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
    }
}
