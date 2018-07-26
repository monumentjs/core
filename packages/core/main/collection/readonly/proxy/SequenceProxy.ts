import {Sequence} from '../Sequence';


export abstract class SequenceProxy<TItem, TItems extends Sequence<TItem>> implements Sequence<TItem> {
    protected _items: TItems;

    public get length(): number {
        return this._items.length;
    }

    protected constructor(items: TItems) {
        this._items = items;
    }

    public [Symbol.iterator](): Iterator<TItem> {
        return this._items[Symbol.iterator]();
    }

}
