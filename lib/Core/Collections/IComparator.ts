import {ComparisonResult} from '../types';


export interface IComparator<T> {
    compare(x: T, y: T): ComparisonResult;
}
