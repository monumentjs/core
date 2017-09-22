import {Exception} from '../Exceptions/Exception';


export class EmptyStackException extends Exception {
    public constructor() {
        super('Stack is empty.');
    }
}
