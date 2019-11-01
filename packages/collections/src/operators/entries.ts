import { Delegate } from '@monument/core';
import { KeyValuePair } from '../base/KeyValuePair';

export function entries<T, K, V>(self: Iterable<T>, select: Delegate<[T, number], KeyValuePair<K, V>>): Iterable<KeyValuePair<K, V>> {
  return {
    * [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
      let index: number = 0;

      for (const item of self) {
        yield select(item, index);

        index++;
      }
    }
  };
}
