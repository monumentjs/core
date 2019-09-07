import {
  IgnoreCaseEquals,
  RangeException,
  StrictEquals
} from '@monument/core';
import {
  IndexOutOfBoundsException,
  ReadOnlyList,
  Sequence
} from '../../../../index';
import { testReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection.spec';

export function testReadOnlyList(create: <I>(items?: Sequence<I>) => ReadOnlyList<I>) {
  describe('ReadOnlyList', function() {
    testReadOnlyCollection(create);

    describe('firstIndex', function() {
      it('should return -1 when list is empty', function() {
        const list: ReadOnlyList<string> = create();

        expect(list.firstIndex).toBe(-1);
      });

      it('should return 0 when list is not empty', function() {
        {
          const list: ReadOnlyList<string> = create(['a']);

          expect(list.firstIndex).toBe(0);
        }
        {
          const list: ReadOnlyList<string> = create(['a', 'b']);

          expect(list.firstIndex).toBe(0);
        }
        {
          const list: ReadOnlyList<string> = create(['a', 'b', 'c']);

          expect(list.firstIndex).toBe(0);
        }
      });
    });

    describe('lastIndex', function() {
      it('should return -1 when list is empty', function() {
        const list: ReadOnlyList<string> = create();

        expect(list.lastIndex).toBe(-1);
      });

      it('should return index of last item when list is not empty', function() {
        {
          const list: ReadOnlyList<string> = create(['a']);

          expect(list.lastIndex).toBe(0);
        }
        {
          const list: ReadOnlyList<string> = create(['a', 'b']);

          expect(list.lastIndex).toBe(1);
        }
        {
          const list: ReadOnlyList<string> = create(['a', 'b', 'c']);

          expect(list.lastIndex).toBe(2);
        }
      });
    });

    describe('equals()', function() {
      it('should be equal to self', function() {
        const example1: ReadOnlyList<string> = create();
        const example2: ReadOnlyList<string> = create(['a', 'b']);

        expect(example1.equals(example1)).toBe(true);
        expect(example2.equals(example2)).toBe(true);
      });

      it('should preserve order', function() {
        const example1: ReadOnlyList<string> = create(['b', 'a']);
        const example2: ReadOnlyList<string> = create(['a', 'b']);
        const example3: ReadOnlyList<string> = create(['a', 'b']);

        expect(example1.equals(example2)).toBe(false);
        expect(example2.equals(example3)).toBe(true);
        expect(example3.equals(example2)).toBe(true);
      });

      it('should use custom equality comparator', function() {
        const example1: ReadOnlyList<string> = create(['a', 'b']);
        const example2: ReadOnlyList<string> = create(['A', 'B']);

        expect(example1.equals(example2)).toBe(false);
        expect(example1.equals(example2, IgnoreCaseEquals)).toBe(true);
      });
    });

    describe('getAt()', function() {
      it('should throw IndexOutOfBoundsException if index out of bounds', function() {
        const list = create();
        const oneElementList = create(['a']);
        const twoElementList = create(['a', 'b']);

        expect(() => {
          list.getAt(0);
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          list.getAt(-1);
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          oneElementList.getAt(1);
        }).toThrow(IndexOutOfBoundsException);

        expect(() => {
          twoElementList.getAt(2);
        }).toThrow(IndexOutOfBoundsException);
      });

      it('should return item with specified index', function() {
        const oneElementList = create(['a']);
        const twoElementList = create(['a', 'b']);
        const threeElementList = create(['a', 'b', 'c']);

        expect(oneElementList.getAt(0)).toBe('a');

        expect(twoElementList.getAt(0)).toBe('a');
        expect(twoElementList.getAt(1)).toBe('b');

        expect(threeElementList.getAt(0)).toBe('a');
        expect(threeElementList.getAt(1)).toBe('b');
        expect(threeElementList.getAt(2)).toBe('c');
      });
    });

    describe('indexOf()', function() {
      it('should not throw if start index equals to 0 and list length is 0', function() {
        const list = create();

        list.indexOf('one', 0, StrictEquals);
      });

      it('should find index of given item in specified range', function() {
        const list = create(['one', 'two', 'three', 'four']);

        expect(list.indexOf('four', 0, 2, StrictEquals)).toBe(-1);
        expect(list.indexOf('four', 0, 4, StrictEquals)).toBe(3);
      });

      it('should find index of given item starting from first element', function() {
        const list = create(['one', 'two']);

        expect(list.indexOf('one')).toBe(0);
        expect(list.indexOf('two')).toBe(1);
        expect(list.indexOf('three')).toBe(-1);
      });

      it('should find index of given item starting from specified index', function() {
        const list = create(['one', 'two']);

        expect(list.indexOf('one', 1, StrictEquals)).toBe(-1);
        expect(list.indexOf('two', 1, StrictEquals)).toBe(1);
      });

      it('should find index of given item using custom equality comparator', function() {
        const list = create(['one', 'two']);

        expect(list.indexOf('ONE')).toBe(-1);
        expect(list.indexOf('ONE', 0, list.length, IgnoreCaseEquals)).toBe(0);
        expect(list.indexOf('ONE', 1, list.length - 1, IgnoreCaseEquals)).toBe(-1);
        expect(list.indexOf('THREE', 0, list.length, IgnoreCaseEquals)).toBe(-1);
      });

      it('should throw if start index is out of bounds', function() {
        const list = create();

        expect(() => {
          list.indexOf('one', 1, StrictEquals);
        }).toThrow(IndexOutOfBoundsException);
      });

      it('should throw if search range is out of bounds', function() {
        const list = create(['one', 'two', 'three', 'four']);

        expect(() => {
          list.indexOf('one', 0, -1, StrictEquals);
        }).toThrow(RangeException);

        expect(() => {
          list.indexOf('one', 0, 5, StrictEquals);
        }).toThrow(RangeException);
      });
    });

    describe('lastIndexOf()', function() {
      it('should throw RangeException if search range length specified as negative number', function() {
        const list = create(['one', 'two', 'three', 'four']);

        list.lastIndexOf('one', 0, 1, StrictEquals);

        expect(() => {
          list.lastIndexOf('one', 0, 5, StrictEquals);
        }).toThrow(RangeException);
      });

      it('should not throw if `startIndex` argument is 0 and list length is 0', function() {
        const list = create();

        list.lastIndexOf('one', 0, StrictEquals);
      });

      it('should not throw if `startIndex` argument is not defined', function() {
        const list = create();

        list.lastIndexOf('one');
      });

      it('should find index of given item', function() {
        const list = create(['one', 'two', 'one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('four')).toBe(5);
        expect(list.lastIndexOf('three')).toBe(4);
        expect(list.lastIndexOf('two')).toBe(3);
        expect(list.lastIndexOf('one')).toBe(2);
        expect(list.lastIndexOf('five')).toBe(-1);
      });

      it('should find index of given item in specified range', function() {
        const list = create(['one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('one', 3, 2, StrictEquals)).toBe(-1);
        expect(list.lastIndexOf('one', 3, 4, StrictEquals)).toBe(0);
      });

      it('should find index of given item starting with specified index', function() {
        const source = create(['one', 'two', 'one', 'two', 'three', 'four']);

        expect(source.lastIndexOf('five', 0, StrictEquals)).toBe(-1);
        expect(source.lastIndexOf('one', 0, StrictEquals)).toBe(0);
        expect(source.lastIndexOf('one', 1, StrictEquals)).toBe(0);
        expect(source.lastIndexOf('one', 2, StrictEquals)).toBe(2);
        expect(source.lastIndexOf('two', 2, StrictEquals)).toBe(1);
        expect(source.lastIndexOf('two', 3, StrictEquals)).toBe(3);
        expect(source.lastIndexOf('two', 4, StrictEquals)).toBe(3);
        expect(source.lastIndexOf('three', 1, StrictEquals)).toBe(-1);
        expect(source.lastIndexOf('three', 4, StrictEquals)).toBe(4);
        expect(source.lastIndexOf('three', 5, StrictEquals)).toBe(4);
        expect(source.lastIndexOf('four', 4, StrictEquals)).toBe(-1);
        expect(source.lastIndexOf('four', 5, StrictEquals)).toBe(5);
      });

      it('should find index of given item using custom equality comparator', function() {
        const list: ReadOnlyList<string> = create(['one', 'two']);

        expect(list.lastIndexOf('ONE')).toBe(-1);
        expect(list.lastIndexOf('ONE', 0, 1, IgnoreCaseEquals)).toBe(0);
        expect(list.lastIndexOf('ONE', 1, 1, IgnoreCaseEquals)).toBe(-1);
        expect(list.lastIndexOf('THREE', 0, 1, IgnoreCaseEquals)).toBe(-1);
      });

      it('should throw if `startIndex` is out of bounds', function() {
        const list = create();

        expect(() => {
          list.lastIndexOf('one', 1, StrictEquals);
        }).toThrow(IndexOutOfBoundsException);
      });

      it('should throw if search range length is negative number', function() {
        const list = create(['one', 'two', 'three', 'four']);

        expect(() => {
          list.lastIndexOf('one', 0, -1, StrictEquals);
        }).toThrow(RangeException);
      });
    });
  });
}
