import {EqualityComparator} from './EqualityComparator';


export class StrictEqualityComparator implements EqualityComparator<any> {
    public static readonly instance: StrictEqualityComparator = new StrictEqualityComparator();


    public equals(x: any, y: any): boolean {
        return x === y;
    }
}
