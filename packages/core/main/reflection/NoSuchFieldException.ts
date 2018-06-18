import {Exception} from '../exceptions/Exception';


export class NoSuchFieldException extends Exception {
    public constructor(key: PropertyKey) {
        super(`Descriptor of property "${key.toString()}" is not defined.`);
    }
}
