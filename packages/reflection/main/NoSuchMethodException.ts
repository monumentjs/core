import {Exception} from '@monument/core/main/exceptions/Exception';


export class NoSuchMethodException extends Exception {
    public constructor(key: PropertyKey) {
        super(`Descriptor of method "${key}" is not defined.`);
    }
}
