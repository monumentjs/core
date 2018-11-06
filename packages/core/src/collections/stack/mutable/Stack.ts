import {ReadOnlyStack} from '../readonly/ReadOnlyStack';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Stack<T> extends ReadOnlyStack<T> {
    clear(): boolean;

    /**
     * @throws {EmptyStackException}
     */
    pop(): T;

    push(item: T): boolean;
}
