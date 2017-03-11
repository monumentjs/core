import {ICloneable} from '../../Core/types';


export default class DateTimeFormatInfo implements ICloneable<DateTimeFormatInfo> {

    public clone(): DateTimeFormatInfo {
        return new DateTimeFormatInfo();
    }
}
