import {KeyValuePair, LinkedMap, MultiValueMap, ReadOnlyList, Sequence} from '../../../..';
import {assertLengthAndIsEmpty, testReadOnlyMultiValueMap} from '../readonly/ReadOnlyMultiValueMap.spec';

export function testMultiValueMap(create: <K, V>(items?: Sequence<KeyValuePair<K, V>>) => MultiValueMap<K, V>) {
    describe('MultiValueMap', function () {
        testReadOnlyMultiValueMap(create);

        describe('put()', function () {
            it('should add new pair', function () {
                const map = create();

                map.put('name', 'Alex');

                assertLengthAndIsEmpty(map, 1);

                expect(map.get('name').length).toBe(1);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKeys(['name'])).toBe(true);
                expect(map.containsValue('Alex')).toBe(true);
                expect(map.containsValues(['Alex'])).toBe(true);
                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex')
                ])).toBe(true);

                map.put('email', 'test@mail.com');

                assertLengthAndIsEmpty(map, 2);

                expect(map.get('name').length).toBe(1);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKeys(['name', 'email'])).toBe(true);
                expect(map.containsValue('Alex')).toBe(true);
                expect(map.containsValue('test@mail.com')).toBe(true);
                expect(map.containsValues(['Alex', 'test@mail.com'])).toBe(true);
                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);
                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('email', 'test@mail.com')
                ])).toBe(true);

                map.put('name', 'Dmitri');

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('name').length).toBe(2);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKeys(['name'])).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);
                expect(map.containsValue('Alex')).toBe(true);
                expect(map.containsValue('Dmitri')).toBe(true);
                expect(map.containsValue('test@mail.com')).toBe(true);
                expect(map.containsValues(['Alex', 'Dmitri', 'test@mail.com'])).toBe(true);
                expect(map.containsEntry('name', 'Alex')).toBe(true);
                expect(map.containsEntry('name', 'Dmitri')).toBe(true);
                expect(map.containsEntry('email', 'test@mail.com')).toBe(true);
                expect(map.containsEntries([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ])).toBe(true);
            });
        });

        describe('putAll()', function () {
            it('should add all pairs from given sequence', function () {
                const map = create();

                map.putAll([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('email').length).toBe(1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('name').length).toBe(2);
            });
        });

        describe('putMap()', function () {
            it('should add all pairs from given map', function () {
                const map = create();

                map.putMap(new LinkedMap([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('email', 'test@mail.com')
                ]));

                assertLengthAndIsEmpty(map, 2);

                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('email').length).toBe(1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').length).toBe(1);
            });
        });

        describe('putValues()', function () {
            it('should add all pairs from given map', function () {
                const map = create();

                map.putValues('name', ['Alex', 'Dmitri']);

                assertLengthAndIsEmpty(map, 2);

                map.putValues('email', ['test@mail.com']);

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('email').length).toBe(1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('name').length).toBe(2);
            });
        });

        describe('putIfAbsent()', function () {
            it('should add pair if such key-value combination is not defined', function () {
                const map = create();

                map.putIfAbsent('name', 'Alex');

                assertLengthAndIsEmpty(map, 1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').length).toBe(1);

                map.putIfAbsent('name', 'Dmitri');

                assertLengthAndIsEmpty(map, 2);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('name').length).toBe(2);

                map.putIfAbsent('email', 'test@mail.com');

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('email').length).toBe(1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('name').length).toBe(2);

                map.putIfAbsent('email', 'test@mail.com');

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.get('email').length).toBe(1);

                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('Dmitri');
                expect(map.get('name').length).toBe(2);
            });
        });

        describe('remove()', function () {
            it('should remove all values stored under specified key', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                assertLengthAndIsEmpty(map, 3);

                const names: ReadOnlyList<string> = map.remove('name') as ReadOnlyList<string>;

                assertLengthAndIsEmpty(map, 1);

                expect(names).not.toBeNull();
                expect(names.length).toBe(2);
                expect(names.toArray()).toEqual(['Alex', 'Dmitri']);
                expect(map.containsKey('name')).toBe(false);
                expect(map.containsKeys(['name'])).toBe(false);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);

                const emails: ReadOnlyList<string> = map.remove('email') as ReadOnlyList<string>;

                assertLengthAndIsEmpty(map, 0);

                expect(emails).not.toBeNull();
                expect(emails.length).toBe(1);
                expect(emails.toArray()).toEqual(['test@mail.com']);
                expect(map.containsKey('name')).toBe(false);
                expect(map.containsKeys(['name'])).toBe(false);
                expect(map.containsKey('email')).toBe(false);
                expect(map.containsKeys(['email'])).toBe(false);
            });
        });

        describe('removeBy()', function () {
            it('should remove all pairs matching predicate', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.removeBy((key, value) => {
                    return key === 'name' && value === 'Dmitri';
                })).toBe(true);

                assertLengthAndIsEmpty(map, 2);

                expect(map.get('name').length).toBe(1);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.containsKey('name')).toBe(true);
                expect(map.containsKeys(['name'])).toBe(true);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);

                expect(map.removeBy((key, value) => {
                    return key === 'name' && value === 'Alex';
                })).toBe(true);

                assertLengthAndIsEmpty(map, 1);

                expect(map.get('name').length).toBe(0);
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');
                expect(map.containsKey('name')).toBe(false);
                expect(map.containsKeys(['name'])).toBe(false);
                expect(map.containsKey('email')).toBe(true);
                expect(map.containsKeys(['email'])).toBe(true);

                expect(map.removeBy((key, value) => {
                    return key === 'email' && value === 'test@mail.com';
                })).toBe(true);

                assertLengthAndIsEmpty(map, 0);

                expect(map.get('name').length).toBe(0);
                expect(map.get('email').length).toBe(0);
                expect(map.containsKey('name')).toBe(false);
                expect(map.containsKeys(['name'])).toBe(false);
                expect(map.containsKey('email')).toBe(false);
                expect(map.containsKeys(['email'])).toBe(false);
            });
        });

        describe('removeIf()', function () {
            it('should remove pair with specified key and value', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.removeIf('name', 'Dmitri')).toBe(true);

                assertLengthAndIsEmpty(map, 2);

                expect(map.get('name').length).toBe(1);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');

                expect(map.removeIf('name', 'Alex')).toBe(true);

                assertLengthAndIsEmpty(map, 1);

                expect(map.get('name').length).toBe(0);
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');

                expect(map.removeIf('email', 'test@mail.com')).toBe(true);

                assertLengthAndIsEmpty(map, 0);

                expect(map.get('name').length).toBe(0);
                expect(map.get('email').length).toBe(0);
            });
        });

        describe('replaceIf()', function () {
            it('should replace pair with specified key and value', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.replaceIf('name', 'Dmitri', 'DMITRI')).toBe(true);

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('name').length).toBe(2);
                expect(map.get('name').getAt(0)).toBe('Alex');
                expect(map.get('name').getAt(1)).toBe('DMITRI');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');

                expect(map.replaceIf('name', 'Alex', 'ALEX')).toBe(true);

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('name').length).toBe(2);
                expect(map.get('name').getAt(0)).toBe('ALEX');
                expect(map.get('name').getAt(1)).toBe('DMITRI');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('test@mail.com');

                expect(map.replaceIf('email', 'test@mail.com', 'TEST@MAIL.COM')).toBe(true);

                assertLengthAndIsEmpty(map, 3);

                expect(map.get('name').length).toBe(2);
                expect(map.get('name').getAt(0)).toBe('ALEX');
                expect(map.get('name').getAt(1)).toBe('DMITRI');
                expect(map.get('email').length).toBe(1);
                expect(map.get('email').getAt(0)).toBe('TEST@MAIL.COM');
            });
        });

        describe('clear()', function () {
            it('should remove all pairs', function () {
                const map = create([
                    new KeyValuePair('name', 'Alex'),
                    new KeyValuePair('name', 'Dmitri'),
                    new KeyValuePair('email', 'test@mail.com')
                ]);

                expect(map.clear()).toBe(true);

                assertLengthAndIsEmpty(map, 0);
            });

            it('should work for empty map', function () {
                const map = create();

                expect(map.clear()).toBe(false);

                assertLengthAndIsEmpty(map, 0);
            });
        });

    });
}
