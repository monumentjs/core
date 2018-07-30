import {SequenceProxy} from './SequenceProxy';
import {Enumerable} from '../Enumerable';
import {IteratorFunction} from '../../IteratorFunction';


export abstract class EnumerableProxy<T, TItems extends Enumerable<T>> extends SequenceProxy<T, TItems> implements Enumerable<T> {
    public get isEmpty(): boolean {
        return this._items.isEmpty;
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._items.forEach(...arguments);
    }

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void {
        // @ts-ignore
        this._items.forEachReversed(...arguments);
    }

    public toArray(): T[] {
        return this._items.toArray();
    }
    
}
