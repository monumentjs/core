import {InvalidOperationException} from '../exceptions/InvalidOperationException';


export class EmptyStackException extends InvalidOperationException {
    public constructor() {
        super('Unable to perform operation on empty stack.');
    }
}
