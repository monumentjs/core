import { EqualityComparator } from '../../comparison/equality/EqualityComparator';
import { ReferenceEqualityComparator } from '../../comparison/equality/ReferenceEqualityComparator';

export class IterableEqualityComparator<T> implements EqualityComparator<Iterable<T>> {
    private readonly _itemComparator: EqualityComparator<T>;

    public constructor(itemComparator: EqualityComparator<T> = ReferenceEqualityComparator.get()) {
        this._itemComparator = itemComparator;
    }

    public equals(x: Iterable<T>, y: Iterable<T>): boolean {
        const xIterator = x[Symbol.iterator]();
        const yIterator = y[Symbol.iterator]();

        let xIteratorResult = xIterator.next();
        let yIteratorResult = yIterator.next();

        while (!xIteratorResult.done && !yIteratorResult.done) {
            if (!this._itemComparator.equals(xIteratorResult.value, yIteratorResult.value)) {
                return false;
            }

            xIteratorResult = xIterator.next();
            yIteratorResult = yIterator.next();
        }

        return xIteratorResult.done === yIteratorResult.done;
    }
}
