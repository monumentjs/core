import {Ignore} from '@monument/test-drive/main/decorators/Ignore';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {ThrottlingMethod} from '@monument/core/main/async/decorators/support/ThrottlingMethod';
import {MethodCallEdge} from '@monument/core/main/async/decorators/support/MethodCallEdge';
import {Delay} from '@monument/core/main/async/Delay';
import {Duration} from '@monument/core/main/time/Duration';


const TEST_ARGUMENTS = [1, 2, 3];


@Ignore('Tests status depends on CPU performance')
export class ThrottlingMethodTest {

    @Test
    public 'constructor() creates new instance'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 100);

        assert.equals(method.delay, 100);
        assert.true(method.canCallOnLeadingEdge);
        assert.false(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public async 'call() - skips too rapid calls - leading only'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.LEADING);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - skips too rapid calls - trailing only'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.TRAILING);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - skips too rapid calls - leading and trailing'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.BOTH);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));

        await new Delay(new Duration(0, 0, 0, 20)).wait();

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - returns return value of last execution - leading only'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.LEADING);

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
        assert.true(mock.lastCall.testArguments([1, 2]));
    }


    @Test
    public async 'call() - returns return value of last execution - trailing only'(assert: Assert) {
        let mock: FunctionMock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.TRAILING);

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
        assert.true(mock.lastCall.testArguments([5, 6]));
    }


    @Test
    public async 'call() - returns return value of last execution - leading and trailing'(assert: Assert) {
        let mock = new FunctionMock((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.BOTH);

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
}
