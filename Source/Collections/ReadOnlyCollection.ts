import {Enumerable} from './Enumerable';
import {EqualityComparator} from '../Core/EqualityComparator';
import {IReadOnlyCollection} from './Abstraction/IReadOnlyCollection';
import {IEnumerable} from './Abstraction/IEnumerable';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class ReadOnlyCollection<T> extends Enumerable<T> implements IReadOnlyCollection<T> {

    public clone(): ReadOnlyCollection<T> {
        return new ReadOnlyCollection(this);
    }


    public contains(
        otherItem: T,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        for (let currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }


    public containsAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        for (let otherItem of otherItems) {
            if (this.contains(otherItem, comparator) === false) {
                return false;
            }
        }

        return true;
    }
}
