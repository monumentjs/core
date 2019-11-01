import { argument, InvalidArgumentException } from '@monument/assert';
import { ListBase } from './ListBase';

/**
 * Represents immutable list based on native `Array`.
 * @author Alex Chugaev
 * @since 0.16.0
 */
export class ArrayList<T> extends ListBase<T> {
  private readonly array: Array<T>;

  get length(): number {
    return this.array.length;
  }

  get isEmpty(): boolean {
    return this.array.length === 0;
  }

  constructor(items: Iterable<T> = []) {
    const array: Array<T> = [...items];

    super(array);

    this.array = array;
  }

  getAt(position: number): T | never {
    argument(position >= 0, `Position cannot be negative: position=${position}`);

    if (position >= this.array.length) {
      throw new InvalidArgumentException(`Position is out of bounds: position=${position}, length=${this.array.length}`);
    }

    return this.array[position];
  }
}
