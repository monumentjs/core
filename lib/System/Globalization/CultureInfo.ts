import NumberFormatInfo from './NumberFormatInfo';
import {ICloneable, IFormatProvider, Constructor} from '../../Core/types';


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


export default class CultureInfo implements ICloneable<CultureInfo>, IFormatProvider {
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


    public getFormat(type: Constructor): CultureInfo {
        return this;
    }
}

