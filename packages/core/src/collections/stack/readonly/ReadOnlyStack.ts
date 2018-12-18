import {ReadOnlyCollection} from '../../collection/readonly/ReadOnlyCollection';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyStack<T> extends ReadOnlyCollection<T> {
    /**
     * @throws {EmptyStackException}
     */
    peek(): T;
}
