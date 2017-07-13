import {IEqualityComparator} from './IEqualityComparator';


export class EqualityComparator implements IEqualityComparator<any> {
    public static readonly instance: EqualityComparator = new EqualityComparator();


    public equals(x: any, y: any): boolean {
        return x === y;
    }
}