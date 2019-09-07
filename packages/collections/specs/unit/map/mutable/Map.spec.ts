import {
  EqualsFunction,
  IgnoreCaseEquals,
  PreserveCaseEquals,
} from '@monument/core';
import {
  IterableEqualsFactory,
  KeyValuePair,
  Map,
  Sequence
} from '../../../../index';

export function testMap(
  create: <K, V>(
    items?: Sequence<KeyValuePair<K, V>>,
    keyComparator?: EqualsFunction<K>,
    valueComparator?: EqualsFunction<V>
  ) => Map<K, V>
) {
  describe('Map', function() {
    const iterableEqualityComparator: EqualsFunction<Iterable<string>> = IterableEqualsFactory();
    let map!: Map<string, string>;

    beforeEach(() => {
      map = create<string, string>(
        [['One', 'ONE'], ['Two', 'TWO'], ['three', 'Three'], ['Three', 'THREE']],
        IgnoreCaseEquals,
        IgnoreCaseEquals
      );
    });

    describe('constructor()', function() {
      it('should create new instance of Map', function() {
        expect(map.length).toBe(3);
        expect(map.keyComparator).toBe(IgnoreCaseEquals);
        expect(map.valueComparator).toBe(IgnoreCaseEquals);
        expect(iterableEqualityComparator(map.keys, ['One', 'Two', 'Three'])).toBe(true);
        expect(iterableEqualityComparator(map.values, ['ONE', 'TWO', 'THREE'])).toBe(true);
      });
    });

    describe('containsKey()', function() {
      it('should determine whether map contains pair with specified key', function() {
        expect(map.containsKey('ONE')).toBe(true);
        expect(map.containsKey('Four')).toBe(false);
      });
    });

    describe('containsValue()', function() {
      it('should determine whether map contains pair with specified value', function() {
        expect(map.containsValue('ONE')).toBe(true);
        expect(map.containsValue('Four')).toBe(false);
      });
    });

    describe('clear()', function() {
      it('should remove all key-value pairs from map', function() {
        expect(map.length).toBe(3);

        map.clear();

        expect(map.length).toBe(0);
      });
    });

    describe('equals()', function() {
      it('should be equal to self', function() {
        const one = create([['name', 'Alex'], ['age', '25']]);

        expect(one.equals(one)).toBe(true);
      });

      it('should be equal to also empty map', function() {
        const example1 = create();
        const example2 = create();

        expect(example1.equals(example2)).toBe(true);
        expect(example2.equals(example1)).toBe(true);
      });

      it('should be equal not considering keys order', function() {
        const example11 = create([['name', 'Alex'], ['age', '25']]);

        const example12 = create([['age', '25'], ['name', 'Alex']]);

        expect(example11.equals(example12)).toBe(true);
        expect(example12.equals(example11)).toBe(true);

        const example21 = create([['name', 'Alex'], ['age', '25']]);

        const example22 = create([['name', 'Alex'], ['age', '25']]);

        expect(example21.equals(example22)).toBe(true);
        expect(example22.equals(example21)).toBe(true);
      });

      it('should not equal if key or value comparators are different', function() {
        const one = create<string, string>([['name', 'Alex'], ['age', '25']]);

        const other = create<string, string>([['name', 'Alex'], ['age', '25']], PreserveCaseEquals);

        expect(one.equals(other)).toBe(false);
        expect(other.equals(one)).toBe(false);
      });
    });

    describe('get()', function() {
      it('should return value with key matching equality comparator', function() {
        expect(map.get('ONE')).toBe('ONE');
        expect(map.get('TWO')).toBe('TWO');
        expect(map.get('THREE')).toBe('THREE');
      });

      it('should return fallback value if did not found any', function() {
        expect(map.get('FOUR', () => 'FOUR')).toBe('FOUR');
      });
    });

    describe('put()', function() {
      it('should create new key-value pair', function() {
        map.put('four', 'FOUR');

        expect(map.length).toBe(4);
      });

      it('should overwrite key-value pair with same key', function() {
        map.put('TWO', 'two');

        expect(map.length).toBe(3);
      });
    });

    describe('remove()', function() {
      it('should remove key-value pair by key matching equality comparator', function() {
        expect(map.remove('one')).toBe('ONE');
        expect(map.length).toBe(2);
        expect(map.remove('two')).toBe('TWO');
        expect(map.length).toBe(1);
        expect(map.remove('three')).toBe('THREE');
        expect(map.length).toBe(0);
      });
    });
  });
}
