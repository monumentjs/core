import {ImmutableCollection} from './ImmutableCollection';
import {AbstractReadOnlyCollection} from '../AbstractReadOnlyCollection';
import {EqualityComparator} from '../../EqualityComparator';
import {IteratorFunction} from '../IteratorFunction';


export abstract class AbstractImmutableCollection<T> extends AbstractReadOnlyCollection<T> implements ImmutableCollection<T> {
    public add(item: T): this {
        return this.wrap([...this, item]);
    }

    public addAll(items: Iterable<T>): this {
        return this.wrap([...this, ...items]);
    }

    public clear(): this {
        return this.wrap([]);
    }

    public remove(item: T, comparator?: EqualityComparator<T>): this {
        const result: T[] = this.toArray();
        let index: number = 0;

        for (const current of this) {
            if (this.checkItemsEquality(current, item, comparator)) {
                result.splice(index, 1);
                break;
            }

            index++;
        }

        return this.wrap(result);
    }

    public removeAll(items: Iterable<T>, comparator?: EqualityComparator<T>): this {
        const result: T[] = this.toArray();
        let index: number = 0;

        for (const current of this) {
            for (const item of items) {
                if (this.checkItemsEquality(current, item, comparator)) {
                    result.splice(index, 1);
                    index--;
                    break;
                }
            }

            index++;
        }

        return this.wrap(result);
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): this {
        const result: T[] = [];

        this.forEach((item: T, index: number) => {
            if (predicate(item, index) === false) {
                result.push(item);
            }
        });

        return this.wrap(result);
    }

    public retainAll(items: Iterable<T>, comparator?: EqualityComparator<T>): this {
        return undefined;
    }

    protected abstract wrap(items: Iterable<T>): this;
}
