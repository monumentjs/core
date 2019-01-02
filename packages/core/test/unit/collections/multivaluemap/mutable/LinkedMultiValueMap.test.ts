import {KeyValuePair, LinkedMultiValueMap, Sequence} from '../../../../..';
import {testMultiValueMap} from './MultiValueMap.spec';

describe('LinkedMultiValueMap', function () {
    function create<K, V>(items?: Sequence<KeyValuePair<K, V>>): LinkedMultiValueMap<K, V> {
        const map: LinkedMultiValueMap<K, V> = new LinkedMultiValueMap();

        if (items) {
            map.putAll(items);
        }

        return map;
    }

    testMultiValueMap(create);
});
