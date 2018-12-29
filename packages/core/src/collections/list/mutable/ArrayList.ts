import {AbstractList} from './AbstractList';
import {Sequence} from '../../base/Sequence';
import {ReadOnlyCollection} from '../../collection/readonly/ReadOnlyCollection';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class ArrayList<T> extends AbstractList<T> implements Cloneable<ArrayList<T>> {
    private _items: T[];

    public get length(): number {
        return this._items.length;
    }

    public constructor(items?: Iterable<T>) {
        super();
        this._items = items == null ? [] : [...items];
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public add(item: T): boolean {
        this._items.push(item);

        return true;
    }

    public addAll(items: Iterable<T>): boolean {
        const oldLength: number = this.length;

        this._items.push(...items);

        return this.length !== oldLength;
    }

    public clone(): ArrayList<T> {
        return new ArrayList(this._items);
    }

    public remove(item: T): boolean;

    public remove(item: T, comparator: EqualityComparator<T>): boolean;

    public remove(item: T, comparator: EqualityComparator<T> = StrictEqualityComparator.get()): boolean {
        const oldLength: number = this.length;

        this._items = this._items.filter((currentItem: T): boolean => {
            const matches: boolean = comparator.equals(currentItem, item);

            return !matches;
        });

        return this.length !== oldLength;
    }

    public removeBy(predicate: (item: T, index: number) => boolean): boolean {
        const oldLength: number = this.length;

        for (let index = 0, actualIndex = 0; index < oldLength; index++, actualIndex++) {
            const item: T = this.getAt(actualIndex);
            const itemMatchesPredicate: boolean = predicate(item, index);

            if (itemMatchesPredicate) {
                this._items.splice(actualIndex, 1);

                actualIndex--;
            }
        }

        return this.length !== oldLength;
    }

    public reverse(): ReadOnlyCollection<T> {
        return this.create(this._items.reverse());
    }

    protected create<I>(items?: Iterable<I>): ArrayList<I> {
        return new ArrayList(items);
    }

    protected doClear(): void {
        this._items.length = 0;
    }

    protected doInsert(index: number, item: T): void {
        this._items.splice(index, 0, item);
    }

    protected doInsertAll(index: number, items: Sequence<T>): void {
        this._items.splice(index, 0, ...items);
    }

    protected doRemoveAt(index: number): T {
        return this._items.splice(index, 1)[0];
    }

    protected doSetAt(index: number, newValue: T): T {
        const oldValue: T = this._items[index];

        this._items[index] = newValue;

        return oldValue;
    }
}
