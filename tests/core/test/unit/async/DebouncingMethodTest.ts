import {Ignore} from '@monument/test-drive/main/decorators/Ignore';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {DebouncingMethod} from '@monument/core/main/async/decorators/support/DebouncingMethod';
import {MethodCallEdge} from '@monument/core/main/async/decorators/support/MethodCallEdge';
import {Delay} from '@monument/core/main/async/Delay';
import {Duration} from '@monument/core/main/time/Duration';

const TEST_ARGUMENTS = [1, 2, 3];


@Ignore('Tests status depends on CPU performance')
export class DebouncingMethodTest {

    @Test
    public 'constructor() creates method calling on leading edge by default'(assert: Assert) {
        const mock: FunctionMock = new FunctionMock();
        const method: DebouncingMethod = new DebouncingMethod(mock.value, 100);

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
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.LEADING);

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
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.TRAILING);

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
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 100, MethodCallEdge.BOTH);

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
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.LEADING);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 1);
        assert.true(method.isThrottling);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.equals(mock.calls.length, 1);
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() skips too rapid calls - trailing edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.TRAILING);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 0);
        assert.true(method.isThrottling);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.equals(mock.calls.length, 1);
        assert.true(mock.haveBeenCalledWith(TEST_ARGUMENTS));
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() skips too rapid calls - leading and trailing edges'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.BOTH);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.equals(mock.calls.length, 1);
        assert.true(method.isThrottling);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.equals(mock.calls.length, 2);
        assert.false(method.isThrottling);
    }


    @Test
    public async 'call() returns return value of last execution - leading edge'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.LEADING);

        assert.equals(method.call(null, [1, 2]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [3, 4]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [5, 6]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

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

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.TRAILING);

        assert.equals(method.call(null, [1, 2]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        assert.equals(method.call(null, [3, 4]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        assert.equals(method.call(null, [5, 6]), undefined);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

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

        let method: DebouncingMethod = new DebouncingMethod(mock.value, 10, MethodCallEdge.BOTH);

        assert.equals(method.call(null, [1, 2]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [3, 4]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        assert.equals(method.call(null, [5, 6]), 3);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);

        assert.equals(method.call(null, [7, 8]), 15);

        assert.true(method.isThrottling);
    }


    @Test
    public async 'call() debouncing - leading only - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.LEADING);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 25)).wait();

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - leading only - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.LEADING, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - trailing only - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.TRAILING);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 25)).wait();                  // 40 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - trailing only - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.TRAILING, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
    }


    @Test
    public async 'call() debouncing - leading and trailing - without max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: DebouncingMethod = new DebouncingMethod(mock.value, 20, MethodCallEdge.BOTH);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();                  // 10 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();                  // 20 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 10)).wait();                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 25)).wait();                  // 55 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
    }


    @Test
    public async 'call() debouncing - leading and trailing - with max delay'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method = new DebouncingMethod(mock.value, 20, MethodCallEdge.BOTH, 40);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 15 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 30 ms elapsed

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        method.call(null, TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);

        await new Delay(new Duration(0, 0, 0, 15)).wait();                  // 45 ms elapsed

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
    }
}
