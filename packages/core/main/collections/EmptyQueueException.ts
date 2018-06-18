import {InvalidOperationException} from '../exceptions/InvalidOperationException';


export class EmptyQueueException extends InvalidOperationException {
    public constructor() {
        super('Unable to perform operation on empty queue.');
    }
}
