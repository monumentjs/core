import {ComparisonResult} from './ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Comparable<T> {
    /**
     * Compares 2 values and return:
     * -1 - if current value before other one in the sort order;
     * 0 - if current value has the same place in the sort order as other one;
     * 1 - if current value after other one in the sort order.
     */
    compareTo(other: T): ComparisonResult;
}
