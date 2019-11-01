import { argument } from '@monument/assert';
import { IndexOutOfBoundsException } from '../exceptions/IndexOutOfBoundsException';

export function getAt<T>(self: Iterable<T>, position: number): T | never {
  argument(position >= 0, `Position cannot be negative: position=${position}`);

  let index = 0;

  for (const item of self) {
    if (index === position) {
      return item;
    }

    index++;
  }

  throw new IndexOutOfBoundsException(position, index);
}
