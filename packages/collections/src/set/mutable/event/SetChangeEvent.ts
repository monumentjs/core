import { Set } from '../../immutable/Set';
import { MutableSet } from '../MutableSet';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class SetChangeEvent<T> {
  readonly sender: MutableSet<T>;

  readonly current: Set<T>;

  readonly previous: Set<T>;

  constructor(sender: MutableSet<T>, current: Set<T>, previous: Set<T>) {
    this.sender = sender;
    this.current = current;
    this.previous = previous;
  }
}
