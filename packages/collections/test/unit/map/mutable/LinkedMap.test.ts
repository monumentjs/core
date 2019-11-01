import { KeyValuePair, LinkedMap } from '../../../..';
import { Delegate } from '@monument/core';
import { testMap } from './Map.spec';

describe('LinkedMap', function() {
  function create<K, V>(
    items?: Iterable<KeyValuePair<K, V>>,
    keyComparator?: Delegate<[K, K], boolean>,
    valueComparator?: Delegate<[V, V], boolean>
  ): LinkedMap<K, V> {
    return new LinkedMap(items, keyComparator, valueComparator);
  }

  testMap(create);
});
