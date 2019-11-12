import { KeyValuePair } from '../base/KeyValuePair';

export function entries<T>(self: Iterable<T>): Iterable<KeyValuePair<number, T>> {
  return {
    * [Symbol.iterator](): Iterator<KeyValuePair<number, T>> {
      let index: number = 0;

      for (const item of self) {
        yield [index, item];

        index++;
      }
    }
  };
}
