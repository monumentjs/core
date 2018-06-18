import {JSONSerializable} from '../JSONSerializable';


export class LinkedListNode<T> implements JSONSerializable<T> {
    public previousNode: LinkedListNode<T> | undefined;
    public nextNode: LinkedListNode<T> | undefined;
    public nodeValue: T;


    public get hasNextNode(): boolean {
        return this.nextNode != null;
    }


    public get hasPreviousNode(): boolean {
        return this.previousNode != null;
    }


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


    public unlink(): void {
        let previous: LinkedListNode<T> | undefined = this.previousNode;
        let next: LinkedListNode<T> | undefined = this.nextNode;

        if (previous) {
            previous.nextNode = next;
        }

        if (next) {
            next.previousNode = previous;
        }

        this.previousNode = undefined;
        this.nextNode = undefined;
    }


    public toJSON(): T {
        return this.nodeValue;
    }
}
