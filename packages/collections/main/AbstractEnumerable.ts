import {Enumerable} from '@monument/collections-core/main/Enumerable';
import {IteratorFunction} from '@monument/collections-core/main/IteratorFunction';
import {Countable} from '@monument/collections-core/main/Countable';
import {Assert} from '@monument/assert/main/Assert';


export abstract class AbstractEnumerable<T> implements Enumerable<T>, Countable {
    public abstract get length(): number;


    public [Symbol.iterator](): Iterator<T> {
        return this.getIterator();
    }


    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;


    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex?: number, count?: number): void;


    public abstract getIterator(): Iterator<T>;


    protected validateSliceBounds(startIndex: number, count: number): void {
        if (startIndex !== 0) {
            Assert.argument('startIndex', startIndex).isIndexOf(this);
        }

        Assert.argument('count', count).isLength();
        Assert.sequence(this).containsSlice(startIndex, count);
    }
}
