import {ComparisonResult} from './ComparisonResult';


export interface Comparable<T> {
    /**
     * Compares 2 values and return:
     * -1 - if current reflection before other one in the sort order;
     * 0 - if current reflection has the same place in the sort order as other one;
     * 1 - if current reflection after other one in the sort order.
     */
    compareTo(other: T): ComparisonResult;
}
