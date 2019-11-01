import { KeyValuePair, MutableLinkedMultiValueMap } from '../../../..';
import { testMultiValueMap } from './MultiValueMap.spec';

describe('LinkedMultiValueMap', function() {
  function create<K, V>(items?: Iterable<KeyValuePair<K, V>>): MutableLinkedMultiValueMap<K, V> {
    const map: MutableLinkedMultiValueMap<K, V> = new MutableLinkedMultiValueMap();

    if (items) {
      map.putAll(items);
    }

    return map;
  }

  testMultiValueMap(create);

  describe('equals()', function() {
    it('should check equality of multi-value maps', function() {
      const first = create([['name', 'Alex']]);
      const second = create([['name', 'Dmitri']]);

      expect(first.equals(second)).toBe(false);
      expect(second.equals(first)).toBe(false);
    });
  });
});
