import {KeyValuePair, ReadOnlyList, ReadOnlyMap, ReadOnlyMultiValueMap, ReadOnlySet, Sequence} from '../../../../..';

export function assertLengthAndIsEmpty(map: ReadOnlyMap<any, any>, expectedLength: number): void {
    expect(map.length).toBe(expectedLength);
    expect(map.isEmpty).toBe(expectedLength === 0);
}

export function testReadOnlyMultiValueMap(create: <K, V>(items?: Sequence<KeyValuePair<K, V>>) => ReadOnlyMultiValueMap<K, V>) {
    describe('ReadOnlyMultiValueMap', function () {

        describe('constructor()', function () {
            it('should create empty map', function () {
                const map = create();

                assertLengthAndIsEmpty(map, 0);
            });
        });

        describe('keys', function () {
            it('should return set of keys', function () {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
                const keys: ReadOnlySet<string> = source.keys;

                expect(keys.length).toBe(2);
                expect(keys.isEmpty).toBe(false);
                expect(keys.contains('name')).toBe(true);
                expect(keys.contains('email')).toBe(true);
            });
        });

        describe('values', function () {
            it('should return list of values', function () {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
                const values: ReadOnlyList<string> = source.values;

                expect(values.length).toBe(3);
                expect(values.isEmpty).toBe(false);
                expect(values.contains('Alex')).toBe(true);
                expect(values.contains('Dmitri')).toBe(true);
                expect(values.contains('test@mail.com')).toBe(true);
            });
        });

        describe('containsEntries()', function () {
            it('should determines whether map contains all key-value pairs', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ])).toBe(true);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri')
                ])).toBe(true);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex')
                ])).toBe(true);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'XAlex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ])).toBe(false);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'XAlex'),
                    new KeyValuePair('name', 'Dmitri')
                ])).toBe(false);

                expect(map.containsEntries([
                    new KeyValuePair('name', 'XAlex')
                ])).toBe(false);
            });
        });

        describe('containsEntry()', function () {
            it('should determines whether map contains key-value pair', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('name', 'Dmitri')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);

                expect(map.containsEntry('name', 'XAlex')).toBe(false);
                expect(map.containsEntry('xname', 'Alex')).toBe(false);
            });
        });

        describe('containsKey()', function () {
            it('should determines whether map contains key', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKey('unknown')).toBe(false);
            });
        });

        describe('containsKeys()', function () {
            it('should determines whether map contains all keys', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsKeys(['name'])).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);
                expect(map.containsKeys(['unknown'])).toBe(false);
                expect(map.containsKeys(['name', 'email'])).toBe(true);
                expect(map.containsKeys(['name', 'email', 'unknown'])).toBe(false);
            });
        });

        describe('containsValue()', function () {
            it('should determines whether map contains value', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsValue('Alex')).toBe(true);
                expect(map.containsValue('Dmitri')).toBe(true);
                expect(map.containsValue('test@mail.com')).toBe(true);
                expect(map.containsValue('unknown')).toBe(false);
            });
        });

        describe('containsValues()', function () {
            it('should determines whether map contains all values', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.containsValues(['Alex'])).toBe(true);
                expect(map.containsValues(['Dmitri'])).toBe(true);
                expect(map.containsValues(['test@mail.com'])).toBe(true);
                expect(map.containsValues(['unknown'])).toBe(false);
                expect(map.containsValues(['Alex', 'test@mail.com'])).toBe(true);
                expect(map.containsValues(['Alex', 'Dmitri', 'test@mail.com'])).toBe(true);
                expect(map.containsValues(['Alex', 'Dmitri', 'test@mail.com', 'unknown'])).toBe(false);
            });
        });

        describe('get()', function () {
            it('should return list of all items stored under specified key', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.get('name').length).toBe(2);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('unknown').length).toBe(0);
            });
        });

        describe('getFirst()', function () {
            it('should return first item stored under specified key', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.getFirst('name')).toBe('Alex');
                expect(map.getFirst('email')).toBe('test@mail.com');
                expect(map.getFirst('unknown')).toBeUndefined();
            });

            it('should return first item stored under specified key or fallback value', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.getFirst('unknown', 'default')).toBe('default');
            });
        });

        describe('keyOf()', function () {
            it('should return first key of specified value', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.keyOf('Alex')).toBe('name');
                expect(map.keyOf('Dmitri')).toBe('name');
                expect(map.keyOf('test@mail.com')).toBe('email');
                expect(map.keyOf('unknown')).toBeUndefined();
            });
        });

        describe('keysOf()', function () {
            it('should return all keys under which stored specified value', function () {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('bestFriend', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.keysOf('Alex').toArray()).toEqual(['name']);
                expect(map.keysOf('Dmitri').toArray()).toEqual(['name', 'bestFriend']);
                expect(map.keysOf('test@mail.com').toArray()).toEqual(['email']);
                expect(map.keysOf('unknown').toArray()).toEqual([]);
            });
        });

        describe('toSingleValueMap()', function () {
            it('should return map containing only first elements', function () {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
                const map: ReadOnlyMap<string, string> = source.toSingleValueMap();

                expect(map.length).toBe(2);
                expect(map.isEmpty).toBe(false);
                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);
            });
        });

        describe('toArray()', function () {
            it('should return array of key-value pairs', function () {
                const source = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
                const array: Array<KeyValuePair<string, string>> = source.toArray();

                expect(array.length).toBe(3);
                expect(array).toEqual([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
            });
        });

        describe('equals()', function () {
            it('should compare key-value pairs #1', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('email', 'test@mail.com'),
                    new KeyValuePair('name', 'Dmitri')
                ]);

                expect(map.equals([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ])).toBe(true);
            });

            it('should compare key-value pairs #2', function () {
                const map1 = create();
                const map2 = create();

                expect(map1.equals(map2)).toBe(true);
            });

            it('should compare key-value pairs #3', function () {
                const map1 = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);
                const map2 = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map1.equals(map2)).toBe(true);
            });
        });

        describe('for...of', function () {
            it('should iterate over all key-value pairs', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('email', 'test@mail.com'),
                    new KeyValuePair('name', 'Dmitri')
                ]);
                const mock = jest.fn();

                for (const {key, value} of map) {
                    mock(key, value);
                }

                expect(mock).toHaveBeenCalledTimes(3);
                expect(mock).toHaveBeenNthCalledWith(1, 'name', 'Alex');
                expect(mock).toHaveBeenNthCalledWith(2, 'name', 'Dmitri');
                expect(mock).toHaveBeenNthCalledWith(3, 'email', 'test@mail.com');
            });
        });
    });
}
