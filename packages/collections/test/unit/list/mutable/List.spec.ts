import { IndexOutOfBoundsException, MutableList, ReadOnlyList, Sequence } from '../../../..';
import { IgnoreCaseEquals, StrictEquals } from '@monument/comparison';
import { assertLengthAndIsEmpty } from '../../collection/readonly/ReadOnlyCollection.spec';
import { InvalidArgumentException } from '@monument/assert';
import { RangeException } from '@monument/exceptions';

export function testList(create: <T>(items?: Sequence<T>) => MutableList<T>) {
  describe('List', function() {
    describe('ReadOnlyList', function() {

      describe('firstIndex', function() {
        it('should return -1 when list is empty', function() {
          const list: ReadOnlyList<string> = create();

          expect(list.firstIndex).toBe(undefined);
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

          expect(list.lastIndex).toBe(undefined);
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
          }).toThrow(InvalidArgumentException);

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

          list.indexOf('one', StrictEquals, 0);
        });

        it('should find index of given item in specified range', function() {
          const list = create(['one', 'two', 'three', 'four']);

          expect(list.indexOf('four', StrictEquals, 0, 2)).toBe(undefined);
          expect(list.indexOf('four', StrictEquals, 0, 4)).toBe(3);
        });

        it('should find index of given item starting from first element', function() {
          const list = create(['one', 'two']);

          expect(list.indexOf('one')).toBe(0);
          expect(list.indexOf('two')).toBe(1);
          expect(list.indexOf('three')).toBe(undefined);
        });

        it('should find index of given item starting from specified index', function() {
          const list = create(['one', 'two']);

          expect(list.indexOf('one', StrictEquals, 1)).toBe(undefined);
          expect(list.indexOf('two', StrictEquals, 1)).toBe(1);
        });

        it('should find index of given item using custom equality comparator', function() {
          const list = create(['one', 'two']);

          expect(list.indexOf('ONE')).toBe(undefined);
          expect(list.indexOf('ONE', IgnoreCaseEquals, 0, list.length)).toBe(0);
          expect(list.indexOf('ONE', IgnoreCaseEquals, 1, list.length - 1)).toBe(undefined);
          expect(list.indexOf('THREE', IgnoreCaseEquals, 0, list.length)).toBe(undefined);
        });

        it('should throw if start index is out of bounds', function() {
          const list = create();

          expect(() => {
            list.indexOf('one', StrictEquals, 1);
          }).toThrow(IndexOutOfBoundsException);
        });

        it('should throw if search range is out of bounds', function() {
          const list = create(['one', 'two', 'three', 'four']);

          expect(() => {
            list.indexOf('one', StrictEquals, 0, -1);
          }).toThrow(RangeException);

          expect(() => {
            list.indexOf('one', StrictEquals, 0, 5);
          }).toThrow(RangeException);
        });
      });

      describe('lastIndexOf()', function() {
        it('should throw RangeException if search range length specified as negative number', function() {
          const list = create(['one', 'two', 'three', 'four']);

          list.lastIndexOf('one', StrictEquals, 0, 1);

          expect(() => {
            list.lastIndexOf('one', StrictEquals, 0, 5);
          }).toThrow(RangeException);
        });

        it('should not throw if `startIndex` argument is 0 and list length is 0', function() {
          const list = create();

          list.lastIndexOf('one', StrictEquals, 0);
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
          expect(list.lastIndexOf('five')).toBe(undefined);
        });

        it('should find index of given item in specified range', function() {
          const list = create(['one', 'two', 'three', 'four']);

          expect(list.lastIndexOf('one', StrictEquals, 3, 2)).toBe(undefined);
          expect(list.lastIndexOf('one', StrictEquals, 3, 4)).toBe(0);
        });

        it('should find index of given item starting with specified index', function() {
          const source = create(['one', 'two', 'one', 'two', 'three', 'four']);

          expect(source.lastIndexOf('five', StrictEquals, 0)).toBe(undefined);
          expect(source.lastIndexOf('one', StrictEquals, 0)).toBe(0);
          expect(source.lastIndexOf('one', StrictEquals, 1)).toBe(0);
          expect(source.lastIndexOf('one', StrictEquals, 2)).toBe(2);
          expect(source.lastIndexOf('two', StrictEquals, 2)).toBe(1);
          expect(source.lastIndexOf('two', StrictEquals, 3)).toBe(3);
          expect(source.lastIndexOf('two', StrictEquals, 4)).toBe(3);
          expect(source.lastIndexOf('three', StrictEquals, 1)).toBe(undefined);
          expect(source.lastIndexOf('three', StrictEquals, 4)).toBe(4);
          expect(source.lastIndexOf('three', StrictEquals, 5)).toBe(4);
          expect(source.lastIndexOf('four', StrictEquals, 4)).toBe(undefined);
          expect(source.lastIndexOf('four', StrictEquals, 5)).toBe(5);
        });

        it('should find index of given item using custom equality comparator', function() {
          const list: ReadOnlyList<string> = create(['one', 'two']);

          expect(list.lastIndexOf('ONE')).toBe(undefined);
          expect(list.lastIndexOf('ONE', IgnoreCaseEquals, 0, 1)).toBe(0);
          expect(list.lastIndexOf('ONE', IgnoreCaseEquals, 1, 1)).toBe(undefined);
          expect(list.lastIndexOf('THREE', IgnoreCaseEquals, 0, 1)).toBe(undefined);
        });

        it('should throw if `startIndex` is out of bounds', function() {
          const list = create();

          expect(() => {
            list.lastIndexOf('one', StrictEquals, 1);
          }).toThrow(IndexOutOfBoundsException);
        });

        it('should throw if search range length is negative number', function() {
          const list = create(['one', 'two', 'three', 'four']);

          expect(() => {
            list.lastIndexOf('one', StrictEquals, 0, -1);
          }).toThrow(RangeException);
        });
      });
    });

    describe('add()', function() {
      it('should add item into list', function() {
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create();

        expect(list.addAll([])).toBe(false);

        assertLengthAndIsEmpty(list, 0);
      });

      it('should add all items', function() {
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create(['one', 'two']);

        expect(list.clear()).toBe(true);

        assertLengthAndIsEmpty(list, 0);

        expect(list.clear()).toBe(false);
      });
    });

    describe('insert()', function() {
      it('should insert item into list', function() {
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create(['one', 'four']);

        expect(list.insertAll(1, ['two', 'three'])).toBe(true);
        expect(list.insertAll(1, [])).toBe(false);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
      });

      it('should throw if `index` is out of bounds', function() {
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create();

        expect(list.remove('itemThatIsNotInCollection')).toBe(false);
      });

      it('should return `true` if item was removed from list', function() {
        const list: MutableList<string> = create(['one', 'two', 'three', 'four']);

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
        const list: MutableList<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        assertLengthAndIsEmpty(list, 6);

        expect(list.removeAll(['a', 'b'])).toBe(true);
        expect(list.removeAll([])).toBe(false);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['c', 'd']);
      });

      it('should remove items containing in both lists using custom equality comparator', function() {
        const list: MutableList<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        list.removeAll(['A', 'B']);

        assertLengthAndIsEmpty(list, 6);

        list.removeAll(['A', 'B'], IgnoreCaseEquals);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['c', 'd']);
      });
    });

    describe('removeBy()', function() {
      it('should remove items for whose predicate function returns `true`', function() {
        const list: MutableList<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

        list.removeBy((character: string): boolean => {
          return character === 'a';
        });

        assertLengthAndIsEmpty(list, 3);

        expect(list.toArray()).toEqual(['b', 'c', 'd']);
      });
    });

    describe('removeAt()', function() {
      it('should remove item with specified index from list', function() {
        const list: MutableList<string> = create(['one', 'two']);

        expect(list.removeAt(1)).toBe('two');

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(list.removeAt(0)).toBe('one');

        expect(list.length).toBe(0);
      });

      it('should throw if `index` argument is out of bounds', function() {
        const list: MutableList<string> = create();

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
        const list: MutableList<string> = create(['one', 'two', 'three', 'four', 'five']);

        expect(list.retainAll([])).toBe(true);

        assertLengthAndIsEmpty(list, 0);

        expect(list.toArray()).toEqual([]);
      });

      it('should remove all items except those in specified list', function() {
        const list: MutableList<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(list.retainAll(['one', 'Three'])).toBe(true);

        assertLengthAndIsEmpty(list, 2);

        expect(list.toArray()).toEqual(['one', 'Three']);
      });

      it('should use custom equality comparator', function() {
        const list: MutableList<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(list.retainAll(['one', 'Three'], IgnoreCaseEquals)).toBe(true);

        assertLengthAndIsEmpty(list, 4);

        expect(list.toArray()).toEqual(['one', 'three', 'One', 'Three']);
      });
    });

    describe('setAt()', function() {
      it('should set value of element at specified index', function() {
        const list: MutableList<string> = create(['a', 'b', 'c']);

        expect(list.setAt(0, 'one')).toBe('a');
        expect(list.setAt(1, 'two')).toBe('b');
        expect(list.setAt(2, 'three')).toBe('c');
      });

      it('should not throw IndexOutOfBoundsException if index equals to list length', function() {
        const list: MutableList<string> = create();

        expect(() => {
          list.setAt(0, '');
        }).not.toThrow(IndexOutOfBoundsException);
      });

      it('should throw IndexOutOfBoundsException', function() {
        const list: MutableList<string> = create();

        expect(() => {
          list.setAt(1, '');
        }).toThrow(IndexOutOfBoundsException);
      });
    });
  });
}
