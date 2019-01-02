import {EqualityComparator, KeyValuePair, LinkedMap, Sequence} from '../../../../..';
import {testMap} from './Map.spec';

describe('LinkedMap', function () {
    function create<K, V>(
        items?: Sequence<KeyValuePair<K, V>>,
        keyComparator?: EqualityComparator<K>,
        valueComparator?: EqualityComparator<V>
    ): LinkedMap<K, V> {
        return new LinkedMap(items, keyComparator, valueComparator);
    }

    testMap(create);
});
