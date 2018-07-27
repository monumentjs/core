import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {Sequence} from './Sequence';
import {AbstractEnumerable} from './AbstractEnumerable';


export abstract class AbstractReadOnlyCollection<T> extends AbstractEnumerable<T> implements ReadOnlyCollection<T> {

    public contains(item: T): boolean;

    public contains(item: T, comparator: EqualityComparator<T>): boolean;

    public contains(otherItem: T, comparator?: EqualityComparator<T>): boolean {
        for (const currentItem of this) {
            if (this.checkEquality(currentItem, otherItem, comparator)) {
                return true;
            }
        }

        return false;
    }

    public containsAll(items: Sequence<T>): boolean;

    public containsAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public containsAll(otherItems: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        for (const otherItem of otherItems) {
            for (const currentItem of this) {
                if (this.checkEquality(currentItem, otherItem, comparator)) {
                    return true;
                }
            }
        }

        return true;
    }
}
