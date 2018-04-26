import {Exception} from '@monument/core/main/exceptions/Exception';


export class NoSuchFieldException extends Exception {
    public constructor(key: PropertyKey) {
        super(`Descriptor of property "${key}" is not defined.`);
    }
}
