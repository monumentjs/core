import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {MockFactory} from '@monument/test-drive/main/mock/MockFactory';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {ThrottlingMethod} from '../../main/decorators/support/ThrottlingMethod';
import {MethodCallEdge} from '../../main/decorators/support/MethodCallEdge';
import {AsyncUtils} from '../../main/AsyncUtils';


const TEST_ARGUMENTS = [1, 2, 3];


export class ThrottlingMethodTest {

    @Test
    public 'constructor() creates new instance'(assert: Assert, mockFactory: MockFactory) {
        let mock: FunctionMock = mockFactory.function();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 100);

        assert.equals(method.delay, 100);
        assert.true(method.canCallOnLeadingEdge);
        assert.false(method.canCallOnTrailingEdge);
        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 0);
    }


    @Test
    public async 'call() - skips too rapid calls - leading only'(assert: Assert, mockFactory: MockFactory) {
        let mock: FunctionMock = mockFactory.function();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Leading);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - skips too rapid calls - trailing only'(assert: Assert, mockFactory: MockFactory) {
        let mock: FunctionMock = mockFactory.function();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Trailing);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 0);

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - skips too rapid calls - leading and trailing'(assert: Assert, mockFactory: MockFactory) {
        let mock: FunctionMock = mockFactory.function();
        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Both);

        method.call(null, TEST_ARGUMENTS);
        method.call({}, TEST_ARGUMENTS);
        method.call([], TEST_ARGUMENTS);

        assert.true(method.isThrottling);
        assert.equals(mock.calls.length, 1);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));

        await AsyncUtils.wait(20);

        assert.false(method.isThrottling);
        assert.equals(mock.calls.length, 2);
        assert.true(mock.lastCall.testArguments(TEST_ARGUMENTS));
    }


    @Test
    public async 'call() - returns return value of last execution - leading only'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let mock: FunctionMock = mockFactory.function((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Leading);

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
        assert.true(mock.lastCall.testArguments([1, 2]));
    }


    @Test
    public async 'call() - returns return value of last execution - trailing only'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let mock: FunctionMock = mockFactory.function((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Trailing);

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
        assert.true(mock.lastCall.testArguments([5, 6]));
    }


    @Test
    public async 'call() - returns return value of last execution - leading and trailing'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let mock = mockFactory.function((x: number, y: number): number => {
            return x + y;
        });

        let method: ThrottlingMethod = new ThrottlingMethod(mock.value, 10, MethodCallEdge.Both);

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
}
