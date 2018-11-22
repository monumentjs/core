import {ToJSON} from '../../../base/ToJSON';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedListNode<T> implements ToJSON<T> {
    public previousNode: LinkedListNode<T> | undefined;
    public nextNode: LinkedListNode<T> | undefined;
    public nodeValue: T;

    public constructor(value: T) {
        this.nodeValue = value;
    }

    public link(previous: LinkedListNode<T> | undefined, next: LinkedListNode<T> | undefined) {
        if (this.previousNode) {
            this.previousNode.nextNode = this.nextNode;
        }

        if (this.nextNode) {
            this.nextNode.previousNode = this.previousNode;
        }

        this.previousNode = previous;
        this.nextNode = next;

        if (previous) {
            previous.nextNode = this;
        }

        if (next) {
            next.previousNode = this;
        }
    }

    public toJSON(): T {
        return this.nodeValue;
    }

    public unlink(): void {
        const previous: LinkedListNode<T> | undefined = this.previousNode;
        const next: LinkedListNode<T> | undefined = this.nextNode;

        if (previous) {
            previous.nextNode = next;
        }

        if (next) {
            next.previousNode = previous;
        }

        this.previousNode = undefined;
        this.nextNode = undefined;
    }
}
