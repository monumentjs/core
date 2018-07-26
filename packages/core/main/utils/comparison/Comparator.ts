import {ComparisonResult} from './ComparisonResult';


export interface Comparator<T> {
    compare(x: T, y: T): ComparisonResult;
}
