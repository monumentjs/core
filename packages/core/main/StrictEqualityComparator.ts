import {GetInstance} from './decorators/GetInstance';
import {EqualityComparator} from './EqualityComparator';


export class StrictEqualityComparator implements EqualityComparator<any> {
    @GetInstance()
    public static readonly instance: StrictEqualityComparator;


    public equals(x: any, y: any): boolean {
        return x === y;
    }
}
