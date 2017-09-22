import {Exception} from '../Exceptions/Exception';


export class EmptyQueueException extends Exception {
    public constructor() {
        super('Queue is empty.');
    }
}
