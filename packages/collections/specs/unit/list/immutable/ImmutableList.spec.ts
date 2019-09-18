import { IgnoreCaseEquals } from '@monument/core';
import { IndexOutOfBoundsException } from '@monument/exceptions';
import { ImmutableList, Sequence } from '@monument/contracts';
import { testReadOnlyList } from '../readonly/ReadOnlyList.spec';

export function testImmutableList(create: <T>(items?: Sequence<T>) => ImmutableList<T>) {
  describe('ImmutableList', function() {
    testReadOnlyList(create);

    describe('add()', function() {
      it('should return new list with added item', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.add('one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });
    });

    describe('addAll()', function() {
      it('should return original list if no items to add', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.addAll([]);

        expect(list).toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list with added items', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.addAll(['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('addIfAbsent()', function() {
      it('should return original list if item was present in list', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.addIfAbsent('one');

        expect(list).toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });

      it('should return new list with added items', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.addIfAbsent('two');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('clear()', function() {
      it('should return original list if it was empty', function() {
        const list: ImmutableList<string> = create();
        const emptyList: ImmutableList<string> = list.clear();

        expect(list).toBe(emptyList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(emptyList.length).toBe(0);
        expect(emptyList.toArray()).toEqual([]);
      });

      it('should return new list if list was not empty', function() {
        const list: ImmutableList<string> = create(['one']);
        const emptyList: ImmutableList<string> = list.clear();

        expect(list).not.toBe(emptyList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(emptyList.length).toBe(0);
        expect(emptyList.toArray()).toEqual([]);
      });
    });

    describe('insert()', function() {
      it('should return new list with item inserted', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.insert(0, 'one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });
    });

    describe('insertAll()', function() {
      it('should return original list if no items to insert', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.insertAll(0, []);

        expect(list).toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list with added items', function() {
        const list: ImmutableList<string> = create();
        const newList: ImmutableList<string> = list.insertAll(0, ['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });

    describe('remove()', function() {
      it('should return original list if no items removed', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.remove('two');

        expect(list).toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });

      it('should return new list if item was removed', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.remove('one');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed with custom equality comparator', function() {
        const list: ImmutableList<string> = create(['One']);
        const newList: ImmutableList<string> = list.remove('one', IgnoreCaseEquals);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['One']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });
    });

    describe('removeAll()', function() {
      it('should return original list if no items removed', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.removeAll(['two']);

        expect(list).toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });

      it('should return original list if no items removed', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.removeAll([]);

        expect(list).toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['one']);
      });

      it('should return new list if item was removed', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.removeAll(['one']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed with custom equality comparator', function() {
        const list: ImmutableList<string> = create(['One']);
        const newList: ImmutableList<string> = list.removeAll(['one'], IgnoreCaseEquals);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['One']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });
    });

    describe('removeAt()', function() {
      it('should return new list', function() {
        const list: ImmutableList<string> = create(['one']);
        const newList: ImmutableList<string> = list.removeAt(0);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(1);
        expect(list.toArray()).toEqual(['one']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should throw IndexOutOfBoundsException', function() {
        const list: ImmutableList<string> = create(['one']);

        expect(() => {
          list.removeAt(1);
        }).toThrow(IndexOutOfBoundsException);
      });
    });

    describe('removeBy()', function() {
      it('should return original list if no items removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.removeBy(item => {
          return item.toLowerCase() === 'three';
        });

        expect(list).toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(4);
        expect(newList.toArray()).toEqual(['one', 'One', 'ONE', 'two']);
      });

      it('should return new list if items were removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.removeBy(item => {
          return item.toLowerCase() === 'one';
        });

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['two']);
      });
    });

    describe('retainAll()', function() {
      it('should return new list if item was removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.retainAll(['two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(1);
        expect(newList.toArray()).toEqual(['two']);
      });

      it('should return new list if item was removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.retainAll([]);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(0);
        expect(newList.toArray()).toEqual([]);
      });

      it('should return new list if item was removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.retainAll(['one', 'two']);

        expect(list).not.toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });

      it('should return original list if no items removed', function() {
        const list: ImmutableList<string> = create(['one', 'One', 'ONE', 'two']);
        const newList: ImmutableList<string> = list.retainAll(['one', 'two'], IgnoreCaseEquals);

        expect(list).toBe(newList);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'One', 'ONE', 'two']);

        expect(newList.length).toBe(4);
        expect(newList.toArray()).toEqual(['one', 'One', 'ONE', 'two']);
      });
    });

    describe('setAt()', function() {
      it('should return new list with overridden item', function() {
        const list: ImmutableList<string> = create(['one', 'three']);
        const newList: ImmutableList<string> = list.setAt(1, 'two');

        expect(list).not.toBe(newList);

        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual(['one', 'three']);

        expect(newList.length).toBe(2);
        expect(newList.toArray()).toEqual(['one', 'two']);
      });
    });
  });
}
