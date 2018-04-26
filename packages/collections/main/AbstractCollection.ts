import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {Cloneable} from '@monument/core/main/Cloneable';
import {Collection} from './Collection';
import {IteratorFunction} from './IteratorFunction';
import {AbstractReadOnlyCollection} from './AbstractReadOnlyCollection';


export abstract class AbstractCollection<T> extends AbstractReadOnlyCollection<T> implements Collection<T>, Cloneable<Collection<T>> {

    protected constructor(items?: Iterable<T>) {
        super();

        if (items != null) {
            this.addAll(items);
        }
    }


    // Cloneable interface implementation


    public abstract clone(): Collection<T>;


    // Collection interface implementation


    public abstract add(item: T): boolean;


    public addAll(items: Iterable<T>): boolean {
        let oldLength: number = this.length;

        for (let item of items) {
            this.add(item);
        }

        return this.length !== oldLength;
    }


    public abstract remove(item: T, comparator?: EqualityComparator<T>): boolean;


    public abstract removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): boolean;


    public abstract removeBy(predicate: IteratorFunction<T, boolean>): boolean;


    public retainAll(otherItems: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): boolean {
        return this.removeBy((currentItem: T) => {
            let remove: boolean = true;

            for (let otherItem of otherItems) {
                if (comparator.equals(currentItem, otherItem)) {
                    remove = false;

                    break;
                }
            }

            return remove;
        });
    }


    public abstract clear(): boolean;
}
