import {RuntimeException} from '../exceptions/RuntimeException';


export class NoSuchFieldException extends RuntimeException {
    public constructor(key: PropertyKey) {
        super(`Descriptor of property "${key.toString()}" is not defined.`);
    }
}
