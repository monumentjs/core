import {ComparisonResult} from '../Types/ComparisonResult';


export interface IComparator<T> {
    compare(x: T, y: T): ComparisonResult;
}
