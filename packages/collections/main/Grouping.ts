import {EqualityComparator} from '../../core/main/EqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {IteratorFunction} from './IteratorFunction';


export class Grouping<K, V> implements ReadOnlyCollection<V> {
    private readonly _key: K;
    private readonly _items: ReadOnlyCollection<V>;


    public get length(): number {
        return this._items.length;
    }


    public get isEmpty(): boolean {
        return this._items.isEmpty;
    }


    public get key(): K {
        return this._key;
    }


    public constructor(key: K, values: ReadOnlyCollection<V>) {
        this._key = key;
        this._items = values;
    }


    public clone(): Grouping<K, V> {
        return new Grouping(this.key, this._items);
    }


    public getIterator(): Iterator<V> {
        return this._items.getIterator();
    }


    public forEach(iterator: IteratorFunction<V, boolean | void>, startIndex?: number, count?: number): void {
        this._items.forEach(iterator, startIndex, count);
    }


    public forEachReversed(iterator: IteratorFunction<V, boolean | void>, startIndex?: number, count?: number): void {
        this._items.forEachReversed(iterator, startIndex, count);
    }


    public contains(item: V, comparator?: EqualityComparator<V>): boolean {
        return this._items.contains(item, comparator);
    }


    public containsAll(items: Iterable<V>, comparator?: EqualityComparator<V>): boolean {
        return this._items.containsAll(items, comparator);
    }


    public toArray(): V[] {
        return this._items.toArray();
    }


    public [Symbol.iterator](): Iterator<V> {
        return this._items[Symbol.iterator]();
    }
}
