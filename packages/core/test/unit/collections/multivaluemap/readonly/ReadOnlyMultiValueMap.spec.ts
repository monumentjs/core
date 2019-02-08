import { KeyValuePair, ReadOnlyMap, ReadOnlyMultiValueMap } from '../../../../..';

export function assertLengthAndIsEmpty(map: ReadOnlyMultiValueMap<any, any>, expectedLength: number, expectedValuesCount: number): void {
    expect(map.length).toBe(expectedLength);
    expect(map.valuesCount).toBe(expectedValuesCount);
    expect(map.isEmpty).toBe(expectedLength === 0);
}

export function testReadOnlyMultiValueMap(create: <K, V>(items?: Iterable<KeyValuePair<K, V>>) => ReadOnlyMultiValueMap<K, V>) {
    describe('ReadOnlyMultiValueMap', function() {
        describe('constructor()', function() {
            it('should create empty map', function() {
                const map = create();

                assertLengthAndIsEmpty(map, 0, 0);
            });
        });

        describe('keys', function() {
            it('should return set of keys', function() {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);
                const keys: string[] = [...source.keys];

                expect(keys.length).toBe(2);
                expect(keys).toContain('name');
                expect(keys).toContain('email');
            });
        });

        describe('values', function() {
            it('should return list of values', function() {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);
                const values: string[] = [...source.values];

                expect(values.length).toBe(3);
                expect(values).toContain('Alex');
                expect(values).toContain('Dmitri');
                expect(values).toContain('test@mail.com');
            });
        });

        describe('containsEntries()', function() {
            it('should determines whether map contains all key-value pairs', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.containsEntries([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']])).toBe(true);

                expect(map.containsEntries([['name', 'Alex'], ['name', 'Dmitri']])).toBe(true);

                expect(map.containsEntries([['name', 'Alex']])).toBe(true);

                expect(map.containsEntries([['name', 'XAlex'], ['name', 'Dmitri'], ['email', 'test@mail.com']])).toBe(false);

                expect(map.containsEntries([['name', 'XAlex'], ['name', 'Dmitri']])).toBe(false);

                expect(map.containsEntries([['name', 'XAlex']])).toBe(false);
            });
        });

        describe('containsEntry()', function() {
            it('should determines whether map contains key-value pair', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('name', 'Dmitri')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);

                expect(map.containsEntry('name', 'XAlex')).toBe(false);
                expect(map.containsEntry('xname', 'Alex')).toBe(false);
            });
        });

        describe('containsKey()', function() {
            it('should determines whether map contains key', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKey('unknown')).toBe(false);
            });
        });

        describe('containsKeys()', function() {
            it('should determines whether map contains all keys', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.containsKeys(['name'])).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);
                expect(map.containsKeys(['unknown'])).toBe(false);
                expect(map.containsKeys(['name', 'email'])).toBe(true);
                expect(map.containsKeys(['name', 'email', 'unknown'])).toBe(false);
            });
        });

        describe('containsValue()', function() {
            it('should determines whether map contains value', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.containsValue('Alex')).toBe(true);
                expect(map.containsValue('Dmitri')).toBe(true);
                expect(map.containsValue('test@mail.com')).toBe(true);
                expect(map.containsValue('unknown')).toBe(false);
            });
        });

        describe('containsValues()', function() {
            it('should determines whether map contains all values', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
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

        describe('get()', function() {
            it('should return list of all items stored under specified key', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);
                const names: string[] = [...map.get('name')];
                const emails: string[] = [...map.get('email')];
                const unknowns: string[] = [...map.get('unknown')];

                expect(names.length).toBe(2);
                expect(names).toContain('Alex');
                expect(names).toContain('Dmitri');
                expect(emails.length).toBe(1);
                expect(emails).toContain('test@mail.com');
                expect(unknowns.length).toBe(0);
            });
        });

        describe('getFirst()', function() {
            it('should return first item stored under specified key', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.getFirst('name')).toBe('Alex');
                expect(map.getFirst('email')).toBe('test@mail.com');
                expect(map.getFirst('unknown')).toBeUndefined();
            });

            it('should return first item stored under specified key or fallback value', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.getFirst('unknown', () => 'default')).toBe('default');
            });
        });

        describe('keyOf()', function() {
            it('should return first key of specified value', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect(map.keyOf('Alex')).toBe('name');
                expect(map.keyOf('Dmitri')).toBe('name');
                expect(map.keyOf('test@mail.com')).toBe('email');
                expect(map.keyOf('unknown')).toBeUndefined();
            });
        });

        describe('keysOf()', function() {
            it('should return all keys under which stored specified value', function() {
                const map: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['bestFriend', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);

                expect([...map.keysOf('Alex')]).toEqual(['name']);
                expect([...map.keysOf('Dmitri')]).toEqual(['name', 'bestFriend']);
                expect([...map.keysOf('test@mail.com')]).toEqual(['email']);
                expect([...map.keysOf('unknown')]).toEqual([]);
            });
        });

        describe('toSingleValueMap()', function() {
            it('should return map containing only first elements', function() {
                const source: ReadOnlyMultiValueMap<string, string> = create([
                    ['name', 'Alex'],
                    ['name', 'Dmitri'],
                    ['email', 'test@mail.com']
                ]);
                const map: ReadOnlyMap<string, string> = source.toSingleValueMap();

                expect(map.length).toBe(2);
                expect(map.isEmpty).toBe(false);
                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);
            });
        });

        describe('toArray()', function() {
            it('should return array of key-value pairs', function() {
                const source = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);
                const array: Array<KeyValuePair<string, string>> = source.toArray();

                expect(array.length).toBe(3);
                expect(array).toEqual([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);
            });
        });

        describe('for...of', function() {
            it('should iterate over all key-value pairs', function() {
                const map = create([['name', 'Alex'], ['email', 'test@mail.com'], ['name', 'Dmitri']]);
                const mock = jest.fn();

                for (const [key, value] of map) {
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
