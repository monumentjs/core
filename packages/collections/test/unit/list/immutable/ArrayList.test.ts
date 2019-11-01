import { IgnoreCaseEquals, StrictEquals } from '@monument/comparison';
import { InvalidArgumentException } from '@monument/assert';
import { InvalidOperationException } from '@monument/exceptions';
import { ArrayList, List, Queryable, ReadOnlyList } from '../../../..';
import { isEven } from '../../../util/isEven';
import { isOdd } from '../../../util/isOdd';

describe('ArrayList', function() {
  //#region List
  describe('List', function() {
    describe('add()', function() {
      it('should return new list with added item', function() {
        const list: List<string> = new ArrayList();
        const newList: List<string> = list.append('one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });
    });

    describe('addAll()', function() {
      it('should return new list with added items', function() {
        const list: List<string> = new ArrayList();
        const newList: List<string> = list.appendAll(['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('addIfAbsent()', function() {
      it('should return new list with added items', function() {
        const list: List<string> = new ArrayList(['one']);
        const newList: List<string> = list.appendIfAbsent('two');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('insert()', function() {
      it('should return new list with item inserted', function() {
        const list: List<string> = new ArrayList();
        const newList: List<string> = list.insert(0, 'one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });
    });

    describe('insertAll()', function() {
      it('should return new list with added items', function() {
        const list: List<string> = new ArrayList();
        const newList: List<string> = list.insertAll(0, ['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('remove()', function() {
      it('should return new list if item was removed', function() {
        const list: List<string> = new ArrayList(['one']);
        const newList: List<string> = list.remove('one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed with custom equality comparator', function() {
        const list: List<string> = new ArrayList(['One']);
        const newList: List<string> = list.remove('one', IgnoreCaseEquals);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['One']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });
    });

    describe('removeAll()', function() {
      it('should return new list if item was removed', function() {
        const list: List<string> = new ArrayList(['one']);
        const newList: List<string> = list.removeAll(['one']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed with custom equality comparator', function() {
        const list: List<string> = new ArrayList(['One']);
        const newList: List<string> = list.removeAll(['one'], IgnoreCaseEquals);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['One']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });
    });

    describe('removeAt()', function() {
      it('should return new list', function() {
        const list: List<string> = new ArrayList(['one']);
        const newList: List<string> = list.removeAt(0);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should throw IndexOutOfBoundsException', function() {
        const list = new ArrayList(['one']);
        const result = list.removeAt(1);

        expect(() => result.toArray()).toThrow(InvalidArgumentException);
      });
    });

    describe('removeBy()', function() {
      it('should return new list if items were removed', function() {
        const list: List<string> = new ArrayList(['one', 'One', 'ONE', 'two']);
        const newList: List<string> = list.removeBy(item => item.toLowerCase() === 'one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['two']);
      });
    });

    describe('retainAll()', function() {
      it('should return new list if item was removed', function() {
        const list: List<string> = new ArrayList(['one', 'One', 'ONE', 'two']);
        const newList: List<string> = list.retainAll(['two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['two']);
      });

      it('should return new list if item was removed', function() {
        const list: List<string> = new ArrayList(['one', 'One', 'ONE', 'two']);
        const newList: List<string> = list.retainAll([]);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed', function() {
        const list: List<string> = new ArrayList(['one', 'One', 'ONE', 'two']);
        const newList: List<string> = list.retainAll(['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('setAt()', function() {
      it('should return new list with overridden item', function() {
        const list: List<string> = new ArrayList(['one', 'three']);
        const newList: List<string> = list.setAt(1, 'two');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual(['one', 'three']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });
  });
  //#endregion

  describe('ReadOnlyList', function() {
    //#region ReadOnlyList
    describe('firstIndex', function() {
      it('should return `undefined` when list is empty', function() {
        expect(new ArrayList().firstIndex).toBe(undefined);
      });

      it('should return 0 when list is not empty', function() {
        expect(new ArrayList(['a']).firstIndex).toBe(0);
        expect(new ArrayList(['a', 'b']).firstIndex).toBe(0);
        expect(new ArrayList(['a', 'b', 'c']).firstIndex).toBe(0);
      });
    });

    describe('lastIndex', function() {
      it('should return `undefined` when list is empty', function() {
        expect(new ArrayList().lastIndex).toBe(undefined);
      });

      it('should return index of last item when list is not empty', function() {
        expect(new ArrayList(['a']).lastIndex).toBe(0);
        expect(new ArrayList(['a', 'b']).lastIndex).toBe(1);
        expect(new ArrayList(['a', 'b', 'c']).lastIndex).toBe(2);
      });
    });

    describe('equals()', function() {
      it('should be equal to self', function() {
        const example1: ArrayList<string> = new ArrayList();
        const example2: ArrayList<string> = new ArrayList(['a', 'b']);

        expect(example1.equals(example1)).toBe(true);
        expect(example2.equals(example2)).toBe(true);
      });

      it('should preserve order', function() {
        const example1: ArrayList<string> = new ArrayList(['b', 'a']);
        const example2: ArrayList<string> = new ArrayList(['a', 'b']);
        const example3: ArrayList<string> = new ArrayList(['a', 'b']);

        expect(example1.equals(example2)).toBe(false);
        expect(example2.equals(example3)).toBe(true);
        expect(example3.equals(example2)).toBe(true);
      });

      it('should use custom equality comparator', function() {
        const example1: ArrayList<string> = new ArrayList(['a', 'b']);
        const example2: ArrayList<string> = new ArrayList(['A', 'B']);

        expect(example1.equals(example2)).toBe(false);
        expect(example1.equals(example2, IgnoreCaseEquals)).toBe(true);
      });
    });

    describe('getAt()', function() {
      it('should throw InvalidArgumentException if index out of bounds', function() {
        const emptyList = new ArrayList();
        const oneElementList = new ArrayList(['a']);
        const twoElementList = new ArrayList(['a', 'b']);

        expect(() => emptyList.getAt(0)).toThrow(InvalidArgumentException);
        expect(() => emptyList.getAt(-1)).toThrow(InvalidArgumentException);
        expect(() => oneElementList.getAt(1)).toThrow(InvalidArgumentException);
        expect(() => twoElementList.getAt(2)).toThrow(InvalidArgumentException);
      });

      it('should return item with specified index', function() {
        const oneElementList = new ArrayList(['a']);
        const twoElementList = new ArrayList(['a', 'b']);
        const threeElementList = new ArrayList(['a', 'b', 'c']);

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
        const list: ArrayList<string> = new ArrayList();

        list.indexOf('one', StrictEquals, 0);
      });

      it('should find index of given item in specified range', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two', 'three', 'four']);

        expect(list.indexOf('four', StrictEquals, 0, 2)).toBe(undefined);
        expect(list.indexOf('four', StrictEquals, 0, 4)).toBe(3);
      });

      it('should find index of given item starting from first element', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two']);

        expect(list.indexOf('one')).toBe(0);
        expect(list.indexOf('two')).toBe(1);
        expect(list.indexOf('three')).toBe(undefined);
      });

      it('should find index of given item starting from specified index', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two']);

        expect(list.indexOf('one', StrictEquals, 1)).toBe(undefined);
        expect(list.indexOf('two', StrictEquals, 1)).toBe(1);
      });

      it('should find index of given item using custom equality comparator', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two']);

        expect(list.indexOf('ONE')).toBe(undefined);
        expect(list.indexOf('ONE', IgnoreCaseEquals, 0, list.length)).toBe(0);
        expect(list.indexOf('ONE', IgnoreCaseEquals, 1, list.length - 1)).toBe(undefined);
        expect(list.indexOf('THREE', IgnoreCaseEquals, 0, list.length)).toBe(undefined);
      });
    });

    describe('lastIndexOf()', function() {
      it('should not throw if `startIndex` argument is 0 and list length is 0', function() {
        const list: ArrayList<string> = new ArrayList();

        list.lastIndexOf('one', StrictEquals, 0);
      });

      it('should not throw if `startIndex` argument is not defined', function() {
        const list: ArrayList<string> = new ArrayList();

        list.lastIndexOf('one');
      });

      it('should find index of given item', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two', 'one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('four')).toBe(5);
        expect(list.lastIndexOf('three')).toBe(4);
        expect(list.lastIndexOf('two')).toBe(3);
        expect(list.lastIndexOf('one')).toBe(2);
        expect(list.lastIndexOf('five')).toBe(undefined);
      });

      it('should find index of given item in specified range', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('one', StrictEquals, 3, 2)).toBe(undefined);
        expect(list.lastIndexOf('one', StrictEquals, 0, 4)).toBe(0);
      });

      it('should find index of given item starting with specified index', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two', 'one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('five', StrictEquals, 0)).toBe(undefined);
        expect(list.lastIndexOf('one', StrictEquals, 0)).toBe(2);
        expect(list.lastIndexOf('one', StrictEquals, 1)).toBe(2);
        expect(list.lastIndexOf('one', StrictEquals, 2)).toBe(2);
        expect(list.lastIndexOf('two', StrictEquals, 3)).toBe(3);
        expect(list.lastIndexOf('two', StrictEquals, 4)).toBe(undefined);
        expect(list.lastIndexOf('three', StrictEquals, 1)).toBe(4);
        expect(list.lastIndexOf('three', StrictEquals, 4)).toBe(4);
        expect(list.lastIndexOf('three', StrictEquals, 5)).toBe(undefined);
        expect(list.lastIndexOf('four', StrictEquals, 4)).toBe(5);
        expect(list.lastIndexOf('four', StrictEquals, 5)).toBe(5);
      });

      it('should find index of given item using custom equality comparator', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two']);

        expect(list.lastIndexOf('ONE')).toBe(undefined);
        expect(list.lastIndexOf('ONE', IgnoreCaseEquals, 0, 1)).toBe(0);
        expect(list.lastIndexOf('ONE', IgnoreCaseEquals, 1, 1)).toBe(undefined);
        expect(list.lastIndexOf('THREE', IgnoreCaseEquals, 0, 1)).toBe(undefined);
      });

      it('should throw if search range length is negative number', function() {
        const list: ArrayList<string> = new ArrayList(['one', 'two', 'three', 'four']);

        expect(() => list.lastIndexOf('one', StrictEquals, 0, -1)).toThrow(InvalidArgumentException);
      });
    });
    //#endregion

    //#region Queryable

    describe('aggregate()', function() {
      it('should aggregate value', function() {
        expect(new ArrayList([1, 3, 5]).aggregate((sum, num) => sum + num, 0)).toBe(9);
      });
    });

    describe('all()', function() {
      it('should check whether all items match predicate', function() {
        expect(new ArrayList([1, 2, 3]).all(isOdd)).toBe(false);
        expect(new ArrayList([1, 3, 5]).all(isOdd)).toBe(true);
        expect(() => new ArrayList<number>().all(isOdd)).toThrow(InvalidOperationException);
      });
    });

    describe('any()', function() {
      it('should check whether any item match predicate', function() {
        expect(new ArrayList([1, 2, 3]).any(isOdd)).toBe(true);
        expect(new ArrayList([1, 3, 5]).any(isOdd)).toBe(true);
        expect(() => new ArrayList<number>().any(isOdd)).toThrow(InvalidOperationException);
      });
    });

    describe('average()', function() {
      it('should calculate average value', function() {
        expect(new ArrayList([1, 2, 3]).average(n => n)).toBe(2);
        expect(() => new ArrayList<number>().average(n => n)).toThrow(InvalidOperationException);
      });
    });

    describe('chunk()', function() {
      it('should produce list of chunks of specified length', function() {
        const source: ArrayList<number> = new ArrayList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const result: Queryable<Iterable<number>> = source.chunk(5);

        expect(result.length).toBe(2);
        expect([...result][0]).toEqual([1, 2, 3, 4, 5]);
        expect([...result][1]).toEqual([6, 7, 8, 9]);
      });
    });

    describe('concat()', function() {
      it('should concatenate list with other iterables', function() {
        const source = new ArrayList([1, 2, 3]);
        const result = source.concat([4, 5], [6, 7, 8, 9]);

        expect([...result]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });

    describe('contains()', function() {
      it('should determine whether list contains given item', function() {
        const source = new ArrayList('abc');

        expect(source.contains('a')).toBe(true);
        expect(source.contains('b')).toBe(true);
        expect(source.contains('c')).toBe(true);
        expect(source.contains('d')).toBe(false);
        expect(source.contains('A')).toBe(false);
        expect(source.contains('B')).toBe(false);
        expect(source.contains('C')).toBe(false);

        expect(source.contains('a', IgnoreCaseEquals)).toBe(true);
        expect(source.contains('b', IgnoreCaseEquals)).toBe(true);
        expect(source.contains('c', IgnoreCaseEquals)).toBe(true);
        expect(source.contains('d', IgnoreCaseEquals)).toBe(false);
        expect(source.contains('A', IgnoreCaseEquals)).toBe(true);
        expect(source.contains('B', IgnoreCaseEquals)).toBe(true);
        expect(source.contains('C', IgnoreCaseEquals)).toBe(true);
      });
    });

    describe('containsAll()', function() {
      const source = new ArrayList('abc');

      expect(source.containsAll('a')).toBe(true);
      expect(source.containsAll('b')).toBe(true);
      expect(source.containsAll('c')).toBe(true);
      expect(source.containsAll('d')).toBe(false);
      expect(source.containsAll('A')).toBe(false);
      expect(source.containsAll('B')).toBe(false);
      expect(source.containsAll('C')).toBe(false);
      expect(source.containsAll('aA')).toBe(false);
      expect(source.containsAll('bB')).toBe(false);
      expect(source.containsAll('cC')).toBe(false);

      expect(source.containsAll('a', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('b', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('c', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('d', IgnoreCaseEquals)).toBe(false);
      expect(source.containsAll('A', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('B', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('C', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('aA', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('bB', IgnoreCaseEquals)).toBe(true);
      expect(source.containsAll('cC', IgnoreCaseEquals)).toBe(true);
    });

    describe('count()', function() {
      it('should count items matching predicate', function() {
        const source = new ArrayList([1, 2, 3]);

        expect(source.count(isOdd)).toBe(2);
        expect(source.count(isEven)).toBe(1);
        expect(new ArrayList<number>().count(isEven)).toBe(0);
      });
    });

    describe('distinct()', function() {
      it('should produce list of unique items', function() {
        const source = new ArrayList('abcABC');

        expect([...source.distinct()].join('')).toBe('abcABC');
        expect([...source.distinct(IgnoreCaseEquals)].join('')).toBe('abc');
      });
    });

    describe('entries()', function() {
      it('should produce index-item pairs list', function() {
        const source = new ArrayList('abc');

        expect([...source.entries()]).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]);
      });
    });

    describe('except()', function() {
      it('should produce list without items', function() {
        const source = new ArrayList('abcABC');

        expect([...source.except('ab')].join('')).toBe('cABC');
        expect([...source.except('ab', IgnoreCaseEquals)].join('')).toBe('c');
      });
    });

    describe('findAll()', function() {
      it('should produce list with items matching predicate', function() {
        const source = new ArrayList('abcdefABCDEF');

        expect([...source.findAll(c => IgnoreCaseEquals(c, 'a'))].join('')).toEqual('aA');
      });
    });

    describe('findIndex()', function() {
      it('should find index of first item matching predicate', function() {
        const source = new ArrayList([1, 2, 3, 4, 5]);

        expect(source.findIndex(isOdd)).toBe(0);
        expect(source.findIndex(isEven)).toBe(1);
        expect(source.findIndex(n => n > 100)).toBe(undefined);
      });
    });

    describe('findIndexes()', function() {
      it('should find indexes of items matching predicate', function() {
        const source = new ArrayList([1, 2, 3, 4, 5]);

        expect(source.findIndexes(isOdd).toArray()).toEqual([0, 2, 4]);
        expect(source.findIndexes(isEven).toArray()).toEqual([1, 3]);
        expect(source.findIndexes(n => n > 100).toArray()).toEqual([]);
      });
    });

    describe('first()', function() {
      it('should return first item matching predicate', function() {
        const source = new ArrayList([1, 2, 3, 4, 5]);

        expect(source.first(isOdd)).toBe(1);
        expect(source.first(isEven)).toBe(2);
      });
    });

    describe('forEach()', function() {
      it('should invoke consume delegate for each item and index pair', function() {
        const source = new ArrayList('abc');
        const consume = jest.fn();

        source.forEach(consume);

        expect(consume).toHaveBeenCalledTimes(3);
        expect(consume).toHaveBeenNthCalledWith(1, 'a', 0);
        expect(consume).toHaveBeenNthCalledWith(2, 'b', 1);
        expect(consume).toHaveBeenNthCalledWith(3, 'c', 2);
      });

      it('should break invocation of consume delegate of it returned `false`', function() {
        const source = new ArrayList('abc');
        const consume = jest.fn((item, index) => index < 1);

        source.forEach(consume);

        expect(consume).toHaveBeenCalledTimes(2);
        expect(consume).toHaveBeenNthCalledWith(1, 'a', 0);
        expect(consume).toHaveNthReturnedWith(1, true);
        expect(consume).toHaveBeenNthCalledWith(2, 'b', 1);
        expect(consume).toHaveNthReturnedWith(2, false);
      });
    });

    describe('groupBy()', function() {
      // todo: add tests
    });

    describe('intersect()', function() {
      // todo: add tests
    });

    describe('join()', function() {
      // todo: add tests
    });

    describe('last()', function() {
      it('should return last item matching predicate', function() {
        const source = new ArrayList([1, 2, 3, 4, 5]);

        expect(source.last(isOdd)).toBe(5);
        expect(source.last(isEven)).toBe(4);
        expect(source.last(n => n > 100)).toBe(undefined);
      });
    });

    describe('map()', function() {
      // todo: add tests
    });

    describe('max()', function() {
      // todo: add tests
    });

    describe('min()', function() {
      // todo: add tests
    });

    describe('orderBy()', function() {
      // todo: add tests
    });

    describe('random()', function() {
      // todo: add tests
    });

    describe('reverse()', function() {
      // todo: add tests
    });

    describe('selectMany()', function() {
      // todo: add tests
    });

    describe('skip()', function() {
      // todo: add tests
    });

    describe('skipWhile()', function() {
      // todo: add tests
    });

    describe('slice()', function() {
      // todo: add tests
    });

    describe('sum()', function() {
      // todo: add tests
    });

    describe('take()', function() {
      // todo: add tests
    });

    describe('takeWhile()', function() {
      // todo: add tests
    });

    describe('union()', function() {
      // todo: add tests
    });

    describe('zip()', function() {
      // todo: add tests
    });

    //#endregion

    //#region Equatable

    describe('equals()', function() {
      // todo: add tests
    });

    //#endregion

    //#region ToArray

    describe('toArray()', function() {
      // todo: add tests
    });

    //#endregion

    //#region ToJSON

    describe('toJSON()', function() {
      // todo: add tests
    });

    //#endregion
  });
});
