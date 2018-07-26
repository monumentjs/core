import {SequenceProxy} from './SequenceProxy';
import {Enumerable} from '../Enumerable';
import {IteratorFunction} from '../../IteratorFunction';


export abstract class EnumerableProxy<TItem, TItems extends Enumerable<TItem>> extends SequenceProxy<TItem, TItems> implements Enumerable<TItem> {
    public get isEmpty(): boolean {
        return this._items.isEmpty;
    }

    public forEach(iterator: IteratorFunction<TItem, boolean | void>): void;
    public forEach(iterator: IteratorFunction<TItem, boolean | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<TItem, boolean | void>, startIndex: number, count: number): void;
    public forEach(iterator: IteratorFunction<TItem, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._items.forEach(...arguments);
    }

    public forEachReversed(iterator: IteratorFunction<TItem, boolean | void>): void;
    public forEachReversed(iterator: IteratorFunction<TItem, boolean | void>, startIndex: number): void;
    public forEachReversed(iterator: IteratorFunction<TItem, boolean | void>, startIndex: number, count: number): void;
    public forEachReversed(iterator: IteratorFunction<TItem, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._items.forEachReversed(...arguments);
    }

    public toArray(): TItem[] {
        return this._items.toArray();
    }
    
}
