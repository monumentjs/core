import { KeyValuePair, MultiValueMap } from '../../../..';
import { assertLengthAndIsEmpty, testReadOnlyMultiValueMap } from '../readonly/ReadOnlyMultiValueMap.spec';

export function testMultiValueMap(create: <K, V>(items?: Iterable<KeyValuePair<K, V>>) => MultiValueMap<K, V>) {
  describe('MultiValueMap', function() {
    testReadOnlyMultiValueMap(create);

    describe('put()', function() {
      it('should add new pair', function() {
        let emails: string[];
        let names: string[];
        const map: MultiValueMap<string, string> = create();

        map.put('name', 'Alex');

        assertLengthAndIsEmpty(map, 1, 1);

        names = [...map.get('name')];

        expect(names.length).toBe(1);
        expect(names[0]).toBe('Alex');
        expect(map.containsKey('name')).toBe(true);
        expect(map.containsKeys(['name'])).toBe(true);
        expect(map.containsValue('Alex')).toBe(true);
        expect(map.containsValues(['Alex'])).toBe(true);
        expect(map.containsEntry('name', 'Alex')).toBe(true);
        expect(map.containsEntries([['name', 'Alex']])).toBe(true);

        map.put('email', 'test@mail.com');

        assertLengthAndIsEmpty(map, 2, 2);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(1);
        expect(names).toContain('Alex');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');
        expect(map.containsKey('name')).toBe(true);
        expect(map.containsKey('email')).toBe(true);
        expect(map.containsKeys(['name', 'email'])).toBe(true);
        expect(map.containsValue('Alex')).toBe(true);
        expect(map.containsValue('test@mail.com')).toBe(true);
        expect(map.containsValues(['Alex', 'test@mail.com'])).toBe(true);
        expect(map.containsEntry('name', 'Alex')).toBe(true);
        expect(map.containsEntry('email', 'test@mail.com')).toBe(true);
        expect(map.containsEntries([['name', 'Alex'], ['email', 'test@mail.com']])).toBe(true);

        map.put('name', 'Dmitri');

        assertLengthAndIsEmpty(map, 2, 3);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');
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
        expect(map.containsEntries([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']])).toBe(true);
      });
    });

    describe('putAll()', function() {
      it('should add all pairs from given sequence', function() {
        const map: MultiValueMap<string, string> = create();

        map.putAll([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        assertLengthAndIsEmpty(map, 2, 3);

        const emails = [...map.get('email')];
        const names = [...map.get('name')];

        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');
      });
    });

    describe('putValues()', function() {
      it('should add all pairs from given map', function() {
        const map: MultiValueMap<string, string> = create();

        map.putValues('name', ['Alex', 'Dmitri']);

        assertLengthAndIsEmpty(map, 1, 2);

        map.putValues('email', ['test@mail.com']);

        assertLengthAndIsEmpty(map, 2, 3);

        const emails = [...map.get('email')];
        const names = [...map.get('name')];

        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');
      });
    });

    describe('putIfAbsent()', function() {
      it('should add pair if such key-value combination is not defined', function() {
        let names: string[];
        let emails: string[];
        const map: MultiValueMap<string, string> = create();

        map.putIfAbsent('name', 'Alex');

        assertLengthAndIsEmpty(map, 1, 1);

        names = [...map.get('name')];

        expect(names.length).toBe(1);
        expect(names).toContain('Alex');

        map.putIfAbsent('name', 'Dmitri');

        assertLengthAndIsEmpty(map, 1, 2);

        names = [...map.get('name')];

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');

        map.putIfAbsent('email', 'test@mail.com');

        assertLengthAndIsEmpty(map, 2, 3);

        emails = [...map.get('email')];
        names = [...map.get('name')];

        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');

        map.putIfAbsent('email', 'test@mail.com');

        assertLengthAndIsEmpty(map, 2, 3);

        emails = [...map.get('email')];
        names = [...map.get('name')];

        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');
      });
    });

    describe('remove()', function() {
      it('should remove all values stored under specified key', function() {
        const map = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        assertLengthAndIsEmpty(map, 2, 3);

        const names: string[] = [...(map.remove('name') as Iterable<string>)];

        assertLengthAndIsEmpty(map, 1, 1);

        expect(names).not.toBeNull();
        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('Dmitri');
        expect(map.containsKey('name')).toBe(false);
        expect(map.containsKeys(['name'])).toBe(false);
        expect(map.containsKey('email')).toBe(true);
        expect(map.containsKeys(['email'])).toBe(true);

        const emails: string[] = [...(map.remove('email') as Iterable<string>)];

        assertLengthAndIsEmpty(map, 0, 0);

        expect(emails).not.toBeNull();
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');
        expect(map.containsKey('name')).toBe(false);
        expect(map.containsKeys(['name'])).toBe(false);
        expect(map.containsKey('email')).toBe(false);
        expect(map.containsKeys(['email'])).toBe(false);
      });
    });

    describe('removeBy()', function() {
      it('should remove all pairs matching predicate', function() {
        let emails: string[];
        let names: string[];
        const map = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        expect(
          map.removeBy((key, value) => {
            return key === 'name' && value === 'Dmitri';
          })
        ).toBe(true);

        assertLengthAndIsEmpty(map, 2, 2);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(1);
        expect(names).toContain('Alex');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');
        expect(map.containsKey('name')).toBe(true);
        expect(map.containsKeys(['name'])).toBe(true);
        expect(map.containsKey('email')).toBe(true);
        expect(map.containsKeys(['email'])).toBe(true);

        expect(
          map.removeBy((key, value) => {
            return key === 'name' && value === 'Alex';
          })
        ).toBe(true);

        assertLengthAndIsEmpty(map, 1, 1);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(0);
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');
        expect(map.containsKey('name')).toBe(false);
        expect(map.containsKeys(['name'])).toBe(false);
        expect(map.containsKey('email')).toBe(true);
        expect(map.containsKeys(['email'])).toBe(true);

        expect(
          map.removeBy((key, value) => {
            return key === 'email' && value === 'test@mail.com';
          })
        ).toBe(true);

        assertLengthAndIsEmpty(map, 0, 0);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(0);
        expect(emails.length).toBe(0);
        expect(map.containsKey('name')).toBe(false);
        expect(map.containsKeys(['name'])).toBe(false);
        expect(map.containsKey('email')).toBe(false);
        expect(map.containsKeys(['email'])).toBe(false);
      });
    });

    describe('removeIf()', function() {
      it('should remove pair with specified key and value', function() {
        let emails: string[];
        let names: string[];
        const map = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        expect(map.removeIf('name', 'Dmitri')).toBe(true);

        assertLengthAndIsEmpty(map, 2, 2);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(1);
        expect(names).toContain('Alex');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(map.removeIf('name', 'Alex')).toBe(true);

        assertLengthAndIsEmpty(map, 1, 1);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(0);
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(map.removeIf('email', 'test@mail.com')).toBe(true);

        assertLengthAndIsEmpty(map, 0, 0);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(0);
        expect(emails.length).toBe(0);
      });
    });

    describe('replaceIf()', function() {
      it('should replace pair with specified key and value', function() {
        let emails: string[];
        let names: string[];
        const map = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        expect(map.replaceIf('name', 'Dmitri', 'DMITRI')).toBe(true);

        assertLengthAndIsEmpty(map, 2, 3);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(2);
        expect(names).toContain('Alex');
        expect(names).toContain('DMITRI');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(map.replaceIf('name', 'Alex', 'ALEX')).toBe(true);

        assertLengthAndIsEmpty(map, 2, 3);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(2);
        expect(names).toContain('ALEX');
        expect(names).toContain('DMITRI');
        expect(emails.length).toBe(1);
        expect(emails).toContain('test@mail.com');

        expect(map.replaceIf('email', 'test@mail.com', 'TEST@MAIL.COM')).toBe(true);

        assertLengthAndIsEmpty(map, 2, 3);

        names = [...map.get('name')];
        emails = [...map.get('email')];

        expect(names.length).toBe(2);
        expect(names).toContain('ALEX');
        expect(names).toContain('DMITRI');
        expect(emails.length).toBe(1);
        expect(emails).toContain('TEST@MAIL.COM');
      });
    });

    describe('clear()', function() {
      it('should remove all pairs', function() {
        const map = create([['name', 'Alex'], ['name', 'Dmitri'], ['email', 'test@mail.com']]);

        expect(map.clear()).toBe(true);

        assertLengthAndIsEmpty(map, 0, 0);
      });

      it('should work for empty map', function() {
        const map = create();

        expect(map.clear()).toBe(false);

        assertLengthAndIsEmpty(map, 0, 0);
      });
    });
  });
}
