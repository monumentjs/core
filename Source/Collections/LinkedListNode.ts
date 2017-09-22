import {IJSONSerializable} from '../Core/Abstraction/IJSONSerializable';


export class LinkedListNode<T> implements IJSONSerializable<T> {
    public previous: LinkedListNode<T> | undefined;
    public next: LinkedListNode<T> | undefined;


    public constructor(public value: T) {

    }


    public link(previous: LinkedListNode<T> | undefined, next: LinkedListNode<T> | undefined) {
        if (this.previous) {
            this.previous.next = undefined;
        }

        if (this.next) {
            this.next.previous = undefined;
        }

        this.previous = previous;
        this.next = next;

        if (previous) {
            previous.next = this;
        }

        if (next) {
            next.previous = this;
        }
    }


    public unlink(): void {
        let previous: LinkedListNode<T> | undefined = this.previous;
        let next: LinkedListNode<T> | undefined = this.next;

        if (previous && previous.next === this) {
            previous.next = next;
        }

        if (next && next.previous === this) {
            next.previous = previous;
        }

        this.previous = undefined;
        this.next = undefined;
    }


    public toJSON(): T {
        return this.value;
    }
}
