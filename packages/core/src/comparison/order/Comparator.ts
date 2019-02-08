import { ComparisonResult } from './ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Comparator<T> {
    compare(x: T, y: T): ComparisonResult;
}
