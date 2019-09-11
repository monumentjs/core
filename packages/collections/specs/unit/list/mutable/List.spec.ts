import { IgnoreCaseEquals } from '@monument/core';
import { IndexOutOfBoundsException } from '@monument/exceptions';
import { List, Sequence } from '../../../../index';
import { testReadOnlyList } from '../readonly/ReadOnlyList.spec';
import { assertLengthAndIsEmpty } from '../../collection/readonly/ReadOnlyCollection.spec';

export function testList(create: <T>(items?: Sequence<T>) => List<T>) {
  describe('List', function() {
    testReadOnlyList(create);

    describe('add()', function() {
      it('should add item into list', function() {
        const list: List<string> = create();

        expect(list.add('a')).toBe(true);
        expect(list.toArray()).toEqual(['a']);

        assertLengthAndIsEmpty(list, 1);

        expect(list.add('b')).toBe(true);
        expect(list.toArray()).toEqual(['a', 'b']);

        assertLengthAndIsEmpty(list, 2);

        expect(list.add('c')).toBe(true);
        expect(list.toArray()).toEqual(['a', 'b', 'c']);

        assertLengthAndIsEmpty(list, 3);
      });
    });

    describe('addAll()', function() {
      it('should accept empty sequence', function() {
        const list: List<string> = create();

        expect(list.addAll([])).toBe(false);

        assertLengthAndIsEmpty(list, 0);
      });

      it('should add all items', function() {
        const list: List<string> = create();

        expect(list.addAll(['a'])).toBe(true);
        expect(list.toArray()).toEqual(['a']);

        assertLengthAndIsEmpty(list, 1);

        expect(list.addAll(['b', 'c'])).toBe(true);
        expect(list.toArray()).toEqual(['a', 'b', 'c']);

        assertLengthAndIsEmpty(list, 3);
      });
    });

    describe('addIfAbsent()', function() {
      it('should add item if it is absent', function() {
        const list: List<string> = create();

        expect(list.addIfAbsent('a')).toBe(true);

        assertLengthAndIsEmpty(list, 1);

        expect(list.addIfAbsent('b')).toBe(true);

        assertLengthAndIsEmpty(list, 2);

        expect(list.addIfAbsent('b')).toBe(false);

        assertLengthAndIsEmpty(list, 2);
      });
    });

    describe('clear()', function() {
      it('should clear list', function() {
        const list: List<string> = create(['one', 'two']);

        expect(list.clear()).toBe(true);

        assertLengthAndIsEmpty(list, 0);

        expect(list.clear()).toBe(false);
      });
    });

    describe('insert()', function() {
      it('should insert item into list', function() {
        const list: List<string> = create();

        list.insert(0, 'one');

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        list.insert(1, 'two');

        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual(['one', 'two']);

        list.insert(0, 'three');

        expect(list.length).toBe(3);
        expect(list.toArray()).toEqual(['three', 'one', 'two']);
      });

      it('should throw if index out of bounds', function() {
        const list: List<string> = create();

        expect(() => {
          list.insert(-1, 'one');
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          list.insert(1, 'one');
        }).toThrow(IndexOutOfBoundsException);
      });
    });

    describe('insertAll(index, items)', function() {
      it('should insert items at specified position', function() {
        const list: List<string> = create(['one', 'four']);

        expect(list.insertAll(1, ['two', 'three'])).toBe(true);
        expect(list.insertAll(1, [])).toBe(false);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
      });

      it('should throw if `index` is out of bounds', function() {
        const list: List<string> = create();

        expect(() => {
          list.insertAll(1, ['one', 'two']);
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          list.insertAll(-1, ['one', 'two']);
        }).toThrow(IndexOutOfBoundsException);
      });
    });

    describe('remove()', function() {
      it('should return `false` if list does not contains the item', function() {
        const list: List<string> = create();

        expect(list.remove('itemThatIsNotInCollection')).toBe(false);
      });

      it('should return `true` if item was removed from list', function() {
        const list: List<string> = create(['one', 'two', 'three', 'four']);

        expect(list.remove('two')).toBe(true);

        assertLengthAndIsEmpty(list, 3);

        expect(list.remove('one')).toBe(true);

        assertLengthAndIsEmpty(list, 2);

        expect(list.remove('four')).toBe(true);

        assertLengthAndIsEmpty(list, 1);
      });
    });

    describe('removeAll()', function() {
      it('should remove items containing in both lists', function() {
        const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        assertLengthAndIsEmpty(list, 6);

        expect(list.removeAll(['a', 'b'])).toBe(true);
        expect(list.removeAll([])).toBe(false);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['c', 'd']);
      });

      it('should remove items containing in both lists using custom equality comparator', function() {
        const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        list.removeAll(['A', 'B']);

        assertLengthAndIsEmpty(list, 6);

        list.removeAll(['A', 'B'], IgnoreCaseEquals);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['c', 'd']);
      });
    });

    describe('removeBy()', function() {
      it('should remove items for whose predicate function returns `true`', function() {
        const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        list.removeBy((character: string): boolean => {
          return character === 'a';
        });

        assertLengthAndIsEmpty(list, 3);

        expect(list.toArray()).toEqual(['b', 'c', 'd']);
      });
    });

    describe('removeAt()', function() {
      it('should remove item with specified index from list', function() {
        const list: List<string> = create(['one', 'two']);

        expect(list.removeAt(1)).toBe('two');

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(list.removeAt(0)).toBe('one');

        expect(list.length).toBe(0);
      });

      it('should throw if `index` argument is out of bounds', function() {
        const list: List<string> = create();

        expect(() => {
          list.removeAt(-1);
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          list.removeAt(4);
        }).toThrow(IndexOutOfBoundsException);
      });
    });

    describe('retainAll()', function() {
      it('should accept empty lists', function() {
        const list: List<string> = create(['one', 'two', 'three', 'four', 'five']);

        expect(list.retainAll([])).toBe(true);

        assertLengthAndIsEmpty(list, 0);

        expect(list.toArray()).toEqual([]);
      });

      it('should remove all items except those in specified list', function() {
        const list: List<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(list.retainAll(['one', 'Three'])).toBe(true);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['one', 'Three']);
      });

      it('should use custom equality comparator', function() {
        const list: List<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(list.retainAll(['one', 'Three'], IgnoreCaseEquals)).toBe(true);

        assertLengthAndIsEmpty(list, 4);

        expect(list.toArray()).toEqual(['one', 'three', 'One', 'Three']);
      });
    });

    describe('setAt()', function() {
      it('should set value of element at specified index', function() {
        const list: List<string> = create(['a', 'b', 'c']);

        expect(list.setAt(0, 'one')).toBe('a');
        expect(list.setAt(1, 'two')).toBe('b');
        expect(list.setAt(2, 'three')).toBe('c');
      });

      it('should not throw IndexOutOfBoundsException if index equals to list length', function() {
        const list: List<string> = create();

        expect(() => {
          list.setAt(0, '');
        }).not.toThrow(IndexOutOfBoundsException);
      });

      it('should throw IndexOutOfBoundsException', function() {
        const list: List<string> = create();

        expect(() => {
          list.setAt(1, '');
        }).toThrow(IndexOutOfBoundsException);
      });
    });
  });
}
