import { Equatable } from '@monument/comparison';
import { ReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyStack<T> extends ReadOnlyCollection<T>, Equatable<ReadOnlyStack<T>> {
  /**
   * @throws {EmptyStackException}
   */
  peek(): T;
}
