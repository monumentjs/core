import {Assert} from '../assert/Assert';
import {Enumerable} from './Enumerable';
import {IteratorFunction} from './IteratorFunction';
import {Countable} from './Countable';


export abstract class AbstractEnumerable<T> implements Enumerable<T>, Countable {
    public abstract get length(): number;


    public [Symbol.iterator](): Iterator<T> {
        return this.iterator;
    }


    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;


    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;


    public abstract get iterator(): Iterator<T>;


    protected validateSliceBounds(startIndex: number, count: number): void {
        if (startIndex !== 0) {
            Assert.argument('startIndex', startIndex).isIndexOf(this);
        }

        Assert.argument('count', count).isLength();
        Assert.sequence(this).containsSlice(startIndex, count);
    }
}
