import {Enumerable} from './Enumerable';
import {IEqualityComparator} from './IEqualityComparator';
import {EqualityComparator} from './EqualityComparator';
import {assertArgumentNotNull} from '../Assertion/Assert';


export class ReadOnlyCollection<T> extends Enumerable<T> {

    public contains(otherItem: T, comparator: IEqualityComparator<T> = EqualityComparator.instance): boolean {
        assertArgumentNotNull('comparator', comparator);

        for (let currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }
}
