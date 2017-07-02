import {Enumerable} from './Enumerable';
import {IEqualityComparator} from './IEqualityComparator';
import {EqualityComparator} from './EqualityComparator';
import {Assert} from '../Assertion/Assert';


export class ReadOnlyCollection<T> extends Enumerable<T> {

    public contains(otherItem: T, comparator: IEqualityComparator<T> = EqualityComparator.instance): boolean {
        Assert.argument('comparator', comparator).notNull();

        for (let currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }
}
