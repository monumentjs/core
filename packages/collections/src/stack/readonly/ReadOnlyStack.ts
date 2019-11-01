import { Equatable } from '@monument/comparison';
import { Iterables } from '../../operators/Iterables';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @readonly
 */
export interface ReadOnlyStack<T> extends Iterables<T>, Equatable<ReadOnlyStack<T>> {
  /**
   * @throws {EmptyStackException}
   */
  peek(): T;
}
