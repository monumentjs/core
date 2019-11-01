import { Iterables } from '../../operators/Iterables';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyQueue<T> extends Iterables<T> {
  /**
   * Returns the oldest element of queue without removing it.
   * @throws {EmptyQueueException} if no elements in queue
   */
  peek(): T;
}
