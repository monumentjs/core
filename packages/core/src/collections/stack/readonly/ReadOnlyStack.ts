import {Queryable} from '../../base/Queryable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyStack<T> extends Queryable<T> {
    /**
     * @throws {EmptyStackException}
     */
    peek(): T;
}
