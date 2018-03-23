import {NoSuchItemException} from '@monument/collections-core/main/NoSuchItemException';
import {Deque} from '@monument/collections-core/main/Deque';
import {ListQueue} from './ListQueue';


export class ListDeque<T> extends ListQueue<T> implements Deque<T> {

    // Deque interface implementation


    public addFirst(item: T): void {
        this._items.insert(0, item);
    }


    public removeFirst(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this._items.removeAt(0);
    }


    public getFirst(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot get first item from empty list.`);
        }

        return this._items.getAt(0);
    }


    public addLast(item: T): void {
        this._items.add(item);
    }


    public removeLast(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this._items.removeAt(this.length - 1);
    }


    public getLast(): T {
        if (this.isEmpty) {
            throw new NoSuchItemException(`Cannot remove first item from empty list.`);
        }

        return this._items.getAt(this.length - 1);
    }


    public offerFirst(item: T): boolean {
        this.addFirst(item);

        return true;
    }


    public pollFirst(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.getFirst();
    }


    public pickFirst(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.removeFirst();
    }


    public offerLast(item: T): boolean {
        this.addLast(item);

        return true;
    }


    public pollLast(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.getLast();
    }


    public pickLast(): T | undefined {
        if (this.isEmpty) {
            return undefined;
        }

        return this.removeLast();
    }
}
