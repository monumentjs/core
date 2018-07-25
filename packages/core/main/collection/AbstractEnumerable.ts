import {AbstractSequence} from './AbstractSequence';
import {Enumerable} from './Enumerable';
import {IteratorFunction} from './IteratorFunction';
import {ZERO} from '../Constants';
import {JSONSerializable} from '../JSONSerializable';


export abstract class AbstractEnumerable<T> extends AbstractSequence<T> implements Enumerable<T>, JSONSerializable<T[]> {
    public get isEmpty(): boolean {
        return this.length === ZERO;
    }

    public abstract forEach(iterator: IteratorFunction<T, boolean | void>): void;
    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;
    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public toArray(): T[] {
        return [...this];
    }

    public toJSON(): T[] {
        return this.toArray();
    }

    public valueOf(): T[] {
        return this.toArray();
    }
}
