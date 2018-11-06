import {ReadOnlyList} from '../ReadOnlyList';
import {QueryableProxy} from '../../../base/proxy/QueryableProxy';
import {EqualityComparator} from '../../../../comparison/equality/EqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class ReadOnlyListProxy<TItem, TItems extends ReadOnlyList<TItem>>
    extends QueryableProxy<TItem, TItems>
    implements ReadOnlyList<TItem> {

    public get firstIndex(): number {
        return this._items.firstIndex;
    }

    public get lastIndex(): number {
        return this._items.lastIndex;
    }

    public abstract clone(): ReadOnlyList<TItem>;

    public getAt(index: number): TItem {
        return this._items.getAt(index);
    }

    public indexOf(item: TItem): number;
    public indexOf(item: TItem, comparator: EqualityComparator<TItem>): number;
    public indexOf(item: TItem, startIndex: number): number;
    public indexOf(item: TItem, startIndex: number, comparator: EqualityComparator<TItem>): number;
    public indexOf(item: TItem, startIndex: number, count: number): number;
    public indexOf(item: TItem, startIndex: number, count: number, comparator: EqualityComparator<TItem>): number;
    public indexOf(
        item: TItem,
        startIndex?: EqualityComparator<TItem> | number,
        count?: EqualityComparator<TItem> | number,
        comparator?: EqualityComparator<TItem>
    ): number {
        // @ts-ignore
        return this._items.indexOf(...arguments);
    }

    public lastIndexOf(item: TItem): number;
    public lastIndexOf(item: TItem, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(item: TItem, startIndex: number): number;
    public lastIndexOf(item: TItem, startIndex: number, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(item: TItem, startIndex: number, count: number): number;
    public lastIndexOf(item: TItem, startIndex: number, count: number, comparator: EqualityComparator<TItem>): number;
    public lastIndexOf(
        item: TItem,
        startIndex?: EqualityComparator<TItem> | number,
        count?: EqualityComparator<TItem> | number,
        comparator?: EqualityComparator<TItem>
    ): number {
        // @ts-ignore
        return this._items.lastIndexOf(...arguments);
    }
}
