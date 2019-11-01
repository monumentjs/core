import { List } from '../../immutable/List';
import { MutableList } from '../MutableList';

export class ListChangeEvent<T> {
  readonly sender: MutableList<T>;

  readonly current: List<T>;

  readonly previous: List<T>;

  constructor(
    sender: MutableList<T>,
    current: List<T>,
    previous: List<T>
  ) {
    this.sender = sender;
    this.current = current;
    this.previous = previous;
  }
}
