import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {FunctionMock} from '@monument/test-drive/main/modules/mock/FunctionMock';
import {ObservableValue} from '../../main/ObservableValue';


export class ObservableValueTest {

    @Test
    public 'updates value'(assert: Assert) {
        const value: ObservableValue<number> = new ObservableValue(0);

        assert.equals(value.get(), 0);

        value.set(1);

        assert.equals(value.get(), 1);
    }


    @Test
    public 'populates new subscriber with current value'(assert: Assert) {
        const onNextMock: FunctionMock<(value: number) => void> = new FunctionMock();
        const onCompletedMock: FunctionMock<() => void> = new FunctionMock();
        const onErrorMock: FunctionMock<(error: Error) => void> = new FunctionMock();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock.value,
            onCompleted: onCompletedMock.value,
            onError: onErrorMock.value
        });

        assert.equals(onNextMock.calls.length, 1);
        assert.true(onNextMock.lastCall.testArguments([0]));
        assert.equals(onCompletedMock.calls.length, 0);
        assert.equals(onErrorMock.calls.length, 0);
    }


    @Test
    public 'notifies about subscription complete'(assert: Assert) {
        const onNextMock: FunctionMock<(value: number) => void> = new FunctionMock();
        const onCompletedMock: FunctionMock<() => void> = new FunctionMock();
        const onErrorMock: FunctionMock<(error: Error) => void> = new FunctionMock();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock.value,
            onCompleted: onCompletedMock.value,
            onError: onErrorMock.value
        });

        value.dispose();

        assert.equals(onNextMock.calls.length, 1);
        assert.true(onNextMock.lastCall.testArguments([0]));
        assert.equals(onCompletedMock.calls.length, 1);
        assert.equals(onErrorMock.calls.length, 0);
    }


    @Test
    public 'notifies subscribers only when value changed'(assert: Assert) {
        const onNextMock: FunctionMock<(value: number) => void> = new FunctionMock();
        const onCompletedMock: FunctionMock<() => void> = new FunctionMock();
        const onErrorMock: FunctionMock<(error: Error) => void> = new FunctionMock();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock.value,
            onCompleted: onCompletedMock.value,
            onError: onErrorMock.value
        });

        value.set(0);

        assert.equals(onNextMock.calls.length, 1);
        assert.equals(onCompletedMock.calls.length, 0);
        assert.equals(onErrorMock.calls.length, 0);

        value.set(1);

        assert.equals(onNextMock.calls.length, 2);
        assert.equals(onCompletedMock.calls.length, 0);
        assert.equals(onErrorMock.calls.length, 0);
    }
}
