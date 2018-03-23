import {NumberFormatInfo} from './NumberFormatInfo';
import {Cloneable} from '../../core/main/Cloneable';


export enum PersonNameComponent {
    FirstName,
    LastName,
    Surname,
    /**
     * Alternate name taken by the person.
     */
    Alias,
    /**
     * Alternative name given to the person.
     */
    Nickname
}


export type PersonNameFormat = PersonNameComponent[];


export class CultureInfo implements Cloneable<CultureInfo> {
    public readonly id: string;
    public numberFormat: NumberFormatInfo;
    public dateTimeFormat: string;
    public personNameFormat: PersonNameFormat;


    public constructor(id: string) {
        this.id = id;
    }


    public clone(): CultureInfo {
        return new CultureInfo(this.id);
    }


    public getFormat(): CultureInfo {
        return this;
    }
}

