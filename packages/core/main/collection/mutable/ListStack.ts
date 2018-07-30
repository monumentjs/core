import {Stack} from './Stack';
import {EmptyStackException} from '../EmptyStackException';
import {LinkedList} from './LinkedList';
import {Sequence} from '../readonly/Sequence';
import {Cloneable} from '../../Cloneable';
import {ListProxy} from './proxy/ListProxy';


export class ListStack<T> extends ListProxy<T, LinkedList<T>> implements Cloneable<ListStack<T>>, Stack<T> {

    public constructor(items?: Sequence<T>) {
        super(new LinkedList(items));
    }

    public clone(): ListStack<T> {
        return new ListStack(this);
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this.getAt(this.lastIndex);
    }

    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this.removeAt(this.lastIndex);
    }

    public push(item: T): boolean {
        return this.add(item);
    }
}
