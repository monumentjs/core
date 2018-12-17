import {ObservableValue} from '..';

describe('ObservableValue', function () {

    it('updates value', function () {
        const value: ObservableValue<number> = new ObservableValue(0);

        expect(value.get()).toBe(0);

        value.set(1);

        expect(value.get()).toBe(1);
    });

    it('populates new subscriber with current value', function () {
        const onNextMock = jest.fn();
        const onCompletedMock = jest.fn();
        const onErrorMock = jest.fn();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock,
            onComplete: onCompletedMock,
            onError: onErrorMock
        });

        expect(onNextMock).toHaveBeenCalledTimes(1);
        expect(onNextMock).toHaveBeenLastCalledWith(0);
        expect(onCompletedMock).toHaveBeenCalledTimes(0);
        expect(onErrorMock).toHaveBeenCalledTimes(0);
    });

    it('notifies about subscription complete', function () {
        const onNextMock = jest.fn();
        const onCompletedMock = jest.fn();
        const onErrorMock = jest.fn();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock,
            onComplete: onCompletedMock,
            onError: onErrorMock
        });

        value.dispose();

        expect(onNextMock).toHaveBeenCalledTimes(1);
        expect(onNextMock).toHaveBeenLastCalledWith(0);
        expect(onCompletedMock).toHaveBeenCalledTimes(1);
        expect(onErrorMock).toHaveBeenCalledTimes(0);
    });

    it('notifies subscribers only when value changed', function () {
        const onNextMock = jest.fn();
        const onCompletedMock = jest.fn();
        const onErrorMock = jest.fn();

        const value: ObservableValue<number> = new ObservableValue(0);

        value.subscribe({
            onNext: onNextMock,
            onComplete: onCompletedMock,
            onError: onErrorMock
        });

        value.set(0);

        expect(onNextMock).toHaveBeenCalledTimes(1);
        expect(onCompletedMock).toHaveBeenCalledTimes(0);
        expect(onErrorMock).toHaveBeenCalledTimes(0);

        value.set(1);

        expect(onNextMock).toHaveBeenCalledTimes(2);
        expect(onCompletedMock).toHaveBeenCalledTimes(0);
        expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
});
