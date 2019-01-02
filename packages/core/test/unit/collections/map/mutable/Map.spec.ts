import {EqualityComparator, IgnoreCaseEqualityComparator, KeyValuePair, Map, Sequence} from '../../../../..';

export function testMap(
    create: <K, V>(
        items?: Sequence<KeyValuePair<K, V>>, keyComparator?: EqualityComparator<K>, valueComparator?: EqualityComparator<V>
    ) => Map<K, V>) {

    describe('Map', function () {
        let map!: Map<string, string>;

        beforeEach(() => {
            map = create<string, string>(
                [
                    new KeyValuePair('One', 'ONE'),
                    new KeyValuePair('Two', 'TWO'),
                    new KeyValuePair('three', 'Three'),
                    new KeyValuePair('Three', 'THREE')
                ],
                IgnoreCaseEqualityComparator.get(),
                IgnoreCaseEqualityComparator.get()
            );
        });

        describe('constructor()', function () {
            it('should create new instance of Map', function () {
                expect(map.length).toBe(3);
                expect(map.keyComparator).toBe(IgnoreCaseEqualityComparator.get());
                expect(map.valueComparator).toBe(IgnoreCaseEqualityComparator.get());
                expect(map.keys.toArray()).toEqual(['One', 'Two', 'Three']);
                expect(map.values.toArray()).toEqual(['ONE', 'TWO', 'THREE']);
            });
        });

        describe('put()', function () {
            it('should create new key-value pair', function () {
                map.put('four', 'FOUR');

                expect(map.length).toBe(4);
            });

            it('should overwrite key-value pair with same key', function () {
                map.put('TWO', 'two');

                expect(map.length).toBe(3);
            });
        });

        describe('get()', function () {
            it('should return value with key matching equality comparator', function () {
                expect(map.get('ONE')).toBe('ONE');
                expect(map.get('TWO')).toBe('TWO');
                expect(map.get('THREE')).toBe('THREE');
            });

            it('should return fallback value if did not found any', function () {
                expect(map.get('FOUR', 'FOUR')).toBe('FOUR');
            });
        });

        describe('containsKey()', function () {
            it('should determine whether map contains pair with specified key', function () {
                expect(map.containsKey('ONE')).toBe(true);
                expect(map.containsKey('Four')).toBe(false);
            });
        });

        describe('containsValue()', function () {
            it('should determine whether map contains pair with specified value', function () {
                expect(map.containsValue('ONE')).toBe(true);
                expect(map.containsValue('Four')).toBe(false);
            });
        });

        describe('remove()', function () {
            it('should remove key-value pair by key matching equality comparator', function () {
                expect(map.remove('one')).toBe('ONE');
                expect(map.length).toBe(2);
                expect(map.remove('two')).toBe('TWO');
                expect(map.length).toBe(1);
                expect(map.remove('three')).toBe('THREE');
                expect(map.length).toBe(0);
            });
        });

        describe('clear()', function () {
            it('should remove all key-value pairs from map', function () {
                expect(map.length).toBe(3);

                map.clear();

                expect(map.length).toBe(0);
            });
        });
    });
}
