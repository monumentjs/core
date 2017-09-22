import {ComparisonResult} from '../Types/ComparisonResult';


export interface IComparable<T> {
    /**
     * Compares 2 values and return:
     * -1 - if current object before other one in the sort order;
     * 0 - if current object has the same place in the sort order as other one;
     * 1 - if current object after other one in the sort order.
     */
    compareTo(other: T): ComparisonResult;
}
