import {EqualityComparator} from '../../EqualityComparator';
import {Collection} from './Collection';
import {IteratorFunction} from '../IteratorFunction';
import {AbstractReadOnlyCollection} from '../readonly/AbstractReadOnlyCollection';
import {Sequence} from '../readonly/Sequence';
import {ZERO} from '../../Constants';


export abstract class AbstractCollection<T> extends AbstractReadOnlyCollection<T> implements Collection<T> {

    protected constructor(items?: Sequence<T>) {
        super();

        if (items != null) {
            this.addAll(items);
        }
    }

    public abstract add(item: T): boolean;

    public addAll(items: Sequence<T>): boolean {
        if (items.length === ZERO) {
            return false;
        }

        for (const item of items) {
            this.add(item);
        }

        return true;
    }

    public abstract clear(): boolean;

    public abstract remove(item: T): boolean;

    public abstract remove(item: T, comparator: EqualityComparator<T>): boolean;

    public abstract removeAll(items: Sequence<T>): boolean;

    public abstract removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public abstract removeBy(predicate: IteratorFunction<T, boolean>): boolean;

    public retainAll(otherItems: Sequence<T>): boolean;

    public retainAll(otherItems: Sequence<T>, comparator: EqualityComparator<T>): boolean;

    public retainAll(otherItems: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        return this.removeBy((currentItem: T) => {
            for (const otherItem of otherItems) {
                if (this.checkEquality(currentItem, otherItem)) {
                    return false;
                }
            }

            return true;
        });
    }
}
