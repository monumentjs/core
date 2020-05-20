import { Queryable } from '../../queryable/Queryable';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export interface ReadOnlyQueue<T> extends Queryable<T> {
  /**
   * Returns the oldest element of queue without removing it.
   * @throws {EmptyQueueException} if no elements in queue
   * @author Alex Chugaev
   * @since 0.16.0
   */
  peek(): T;
}
