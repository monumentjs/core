import {List} from './List';
import {IComparator} from './IComparator';
import {SortOrder} from './SortOrder';
import {IEnumerable} from './IEnumerable';
import {Assert} from '../Assertion/Assert';


export class SortedList<T> extends List<T> {
    private _comparator: IComparator<T>;
    private _sortOrder: SortOrder;


    public get comparator(): IComparator<T> {
        return this._comparator;
    }


    public set comparator(value: IComparator<T>) {
        Assert.argument('value', value).notNull();

        this._comparator = value;

        this.sortItems();
    }


    public get sortOrder(): SortOrder {
        return this._sortOrder;
    }


    public set sortOrder(value: SortOrder) {
        Assert.argument('value', value).notNull();

        this._sortOrder = value;

        this.sortItems();
    }


    public constructor(comparator: IComparator<T>, sortOrder: SortOrder = SortOrder.Ascending) {
        super();

        this._comparator = comparator;
        this._sortOrder = sortOrder;
    }


    public add(item: T): void {
        super.add(item);
        this.sortItems();
    }


    public addRange(items: IEnumerable<T>): void {
        super.addRange(items);
        this.sortItems();
    }


    public insert(item: T, index: number): void {
        super.insert(item, index);
        this.sortItems();
    }


    public insertRange(items: IEnumerable<T>, index: number): void {
        super.insertRange(items, index);
        this.sortItems();
    }


    private sortItems(): void {
        let sortedList: List<T> = this.orderBy((item: T): T => {
            return item;
        }, this.comparator, this.sortOrder);

        sortedList.forEach((item: T, index: number): void  => {
            this[index] = item;
        });
    }
}
