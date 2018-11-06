import {Equatable} from './Equatable';
import {EqualityComparator} from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class EquatableComparator<T extends Equatable<T>> implements EqualityComparator<T> {
    private static _instance: EquatableComparator<any> | undefined;

    public static get(): EquatableComparator<any> {
        if (this._instance == null) {
            this._instance = new EquatableComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public equals(x: T, y: T): boolean {
        return x.equals(y);
    }
}
