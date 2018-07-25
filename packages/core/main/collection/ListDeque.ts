import {NoSuchItemException} from './NoSuchItemException';
import {Deque} from './Deque';
import {ListQueue} from './ListQueue';
import {ZERO} from '../Constants';


export class ListDeque<T> extends ListQueue<T> implements Deque<T> {

    public addFirst(item: T): void {
        this.insert(ZERO, item);
    }

    public addLast(item: T): void {
        this.add(item);
    }

    public clone(): ListDeque<T> {
        return new ListDeque(this);
    }

    public getFirst(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot get first item from empty list.`);
        }

        return this.getAt(this.firstIndex);
    }

    public getLast(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this.getAt(this.lastIndex);
    }

    public offerFirst(item: T): boolean {
        this.addFirst(item);

        return true;
    }

    public offerLast(item: T): boolean {
        this.addLast(item);

        return true;
    }

    public pickFirst(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.removeFirst();
    }

    public pickLast(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.removeLast();
    }

    public pollFirst(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.getFirst();
    }

    public pollLast(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.getLast();
    }

    public removeFirst(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this.removeAt(this.firstIndex);
    }

    public removeLast(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this.removeAt(this.lastIndex);
    }
}
