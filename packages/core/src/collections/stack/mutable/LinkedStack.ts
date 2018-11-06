import {Cloneable} from '../../../base/Cloneable';
import {Stack} from './Stack';
import {EmptyStackException} from '../EmptyStackException';
import {LinkedList} from '../../list/mutable/LinkedList';
import {Sequence} from '../../base/Sequence';
import {QueryableProxy} from '../../base/proxy/QueryableProxy';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedStack<T> extends QueryableProxy<T, LinkedList<T>> implements Stack<T>, Cloneable<LinkedStack<T>> {

    public constructor(items?: Sequence<T>) {
        super(new LinkedList());

        if (items) {
            for (const item of items) {
                this.push(item);
            }
        }
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public clone(): LinkedStack<T> {
        return new LinkedStack(this);
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items.getAt(this._items.lastIndex);
    }

    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this._items.removeAt(this._items.lastIndex);
    }

    public push(item: T): boolean {
        return this._items.add(item);
    }
}
