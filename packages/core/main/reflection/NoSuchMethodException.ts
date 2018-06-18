import {Exception} from '../exceptions/Exception';


export class NoSuchMethodException extends Exception {
    public constructor(key: PropertyKey) {
        super(`Descriptor of method "${key.toString()}" is not defined.`);
    }
}
