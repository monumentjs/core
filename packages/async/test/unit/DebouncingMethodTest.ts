import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {DebouncingMethod} from '../../main/decorators/support/DebouncingMethod';
import {MethodCallEdge} from '../../main/decorators/support/MethodCallEdge';
import {AsyncUtils} from '../../main/AsyncUtils';
import {Ignore} from '@monument/test-drive/main/decorators/Ignore';


const TEST_ARGUMENTS = [1, 2, 3];


@Ignore
export class DebouncingMethodTest {

    @Test
    public 'constructor() creates method calling on leading edge by default'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100);

        assert.equals(method.delay, 100);
        assert.equals(method.maxWait, Infinity);
        assert.true(method.canCallOnLeadingEdge);
        assert.false(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public 'constructor() creates method calling on leading edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.Leading);

        assert.equals(method.delay, 100);
        assert.equals(method.maxWait, Infinity);
        assert.true(method.canCallOnLeadingEdge);
        assert.false(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public 'constructor() creates method calling on trailing edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.Trailing);

        assert.equals(method.delay, 100);
        assert.equals(method.maxWait, Infinity);
        assert.false(method.canCallOnLeadingEdge);
        assert.true(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public 'constructor() creates method calling on leading and trailing edges'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.Both);

        assert.equals(method.delay, 100);
        assert.equals(method.maxWait, Infinity);
        assert.true(method.canCallOnLeadingEdge);
        assert.true(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public async 'call() skips too rapid calls - leading edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Leading);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 1);
        assert.true(method.isThrottling);

        await AsyncUtils.wait(20);

        assert.equals(mock.calls.length, 1);
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() skips too rapid calls - trailing edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Trailing);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 0);
        assert.true(method.isThrottling);

        await AsyncUtils.wait(20);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.haveBeenCalledWith(TEST_ARGUMENTS));
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() skips too rapid calls - leading and trailing edges'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Both);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 1);
        assert.true(method.isThrottling);

        await AsyncUtils.wait(20);

        assert.equals(mock.calls.length, 2);
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() returns return value of last execution - leading edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Leading);

        assert.equals(method.call(null, [1, 2]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [3, 4]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [5, 6]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [7, 8]), 15);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 2);
    }


    @Test
    public async 'call() returns return value of last execution - trailing only'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Trailing);

        assert.equals(method.call(null, [1, 2]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        assert.equals(method.call(null, [3, 4]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        assert.equals(method.call(null, [5, 6]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);

        assert.equals(method.call(null, [7, 8]), 11);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() returns return value of last execution - leading and trailing'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.Both);

        assert.equals(method.call(null, [1, 2]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [3, 4]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [5, 6]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);

        assert.equals(method.call(null, [7, 8]), 15);

        assert.true(method.isThrottling);
    }


    @Test
    public async 'call() debouncing - leading only - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.Leading);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(25);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - leading only - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.Leading, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - trailing only - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.Trailing);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(15);                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(25);                  // 40 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - trailing only - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.Trailing, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(15);                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(15);                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(15);                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - leading and trailing - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.Both);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);                  // 10 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);                  // 20 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(10);                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(25);                  // 55 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
    }


    @Test
    public async 'call() debouncing - leading and trailing - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method = new DebouncingMethod(mock.value, 20, MethodCallEdge.Both, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await AsyncUtils.wait(15);                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
    }
}
