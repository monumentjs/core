import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';


export class EmptyQueueException extends InvalidOperationException {
    public constructor() {
        super('Unable to perform operation on empty queue.');
    }
}
