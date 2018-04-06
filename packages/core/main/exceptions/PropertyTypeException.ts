import {Exception} from './Exception';
import {Type} from '../Type';


export class PropertyTypeException extends Exception {
    public readonly propertyKey: PropertyKey;
    public readonly propertyType: Type<any>;


    public constructor(key: PropertyKey, type: Type<any>) {
        super(`Invalid property "${key}": value is not instance of ${type.name}.`);

        this.propertyKey = key;
        this.propertyType = type;
    }
}
