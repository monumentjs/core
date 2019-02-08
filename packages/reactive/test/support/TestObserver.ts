import { Observer } from '../..';

export class TestObserver<T> implements Observer<T> {
    public readonly complete = jest.fn();

    public readonly error = jest.fn();

    public readonly next = jest.fn();
}
