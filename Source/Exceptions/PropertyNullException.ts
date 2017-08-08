import {Exception} from './Exception';


export class PropertyNullException extends Exception {
    public readonly propertyName: string;


    public constructor(propertyName: string) {
        super(`Invalid property "${propertyName}": value is either null or undefined.`);

        this.propertyName = propertyName;
    }
}
