import { EqualsFunction } from '@monument/core';
import { KeyValuePair } from '../../../../src/base/KeyValuePair';
import { LinkedMap } from '../../../../src/map/mutable/LinkedMap';
import { testMap } from './Map.spec';

describe('LinkedMap', function() {
  function create<K, V>(
    items?: Iterable<KeyValuePair<K, V>>,
    keyComparator?: EqualsFunction<K>,
    valueComparator?: EqualsFunction<V>
  ): LinkedMap<K, V> {
    return new LinkedMap(items, keyComparator, valueComparator);
  }

  testMap(create);
});
