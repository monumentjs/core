import {Exception} from './Exception';
import {Constructor} from '../types';


export class PropertyTypeException extends Exception {
    public readonly propertyName: string;
    public readonly propertyValue: Constructor<any>;


    public constructor(propertyName: string, propertyValue: Constructor<any>) {
        super(`Invalid property "${propertyName}": value is not instance of ${propertyValue.name}.`);

        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }
}
