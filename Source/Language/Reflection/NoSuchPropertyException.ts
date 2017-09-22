import {Exception} from '../../Exceptions/Exception';


export class NoSuchPropertyException extends Exception {
    public constructor(key: PropertyKey) {
        super(`Descriptor of property "${key}" is not defined.`);
    }
}
