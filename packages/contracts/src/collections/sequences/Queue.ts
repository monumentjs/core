import { ReadOnlyQueue } from './ReadOnlyQueue';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export interface Queue<T> extends ReadOnlyQueue<T> {
  clear(): boolean;

  /**
   * @throws {EmptyQueueException}
   */
  dequeue(): T;

  enqueue(item: T): boolean;
}
