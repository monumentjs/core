import {RuntimeException} from '../exceptions/RuntimeException';


export class NoSuchMethodException extends RuntimeException {
    public constructor(key: PropertyKey) {
        super(`Descriptor of method "${key.toString()}" is not defined.`);
    }
}
