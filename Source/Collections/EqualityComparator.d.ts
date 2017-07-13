import { IEqualityComparator } from './IEqualityComparator';
export declare class EqualityComparator implements IEqualityComparator<any> {
    static readonly instance: EqualityComparator;
    equals(x: any, y: any): boolean;
}
