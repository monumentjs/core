import { KeyValuePair, LinkedMap } from '../../../..';
import { Func2 } from '@monument/core';
import { testMap } from './Map.spec';

describe('LinkedMap', function() {
  function create<K, V>(
    items?: Iterable<KeyValuePair<K, V>>,
    keyComparator?: Func2<K, K, boolean>,
    valueComparator?: Func2<V, V, boolean>
  ): LinkedMap<K, V> {
    return new LinkedMap(items, keyComparator, valueComparator);
  }

  testMap(create);
});
