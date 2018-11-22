import {
    IgnoreCaseEqualityComparator,
    IndexOutOfBoundsException,
    ItemAddedListChange,
    ItemInsertedListChange,
    ItemRemovedListChange, ItemReplacedListChange,
    List,
    ListChangedEventArgs,
    ListChangeKind,
    ListClearedListChange,
    Sequence
} from '../../../..';
import {testReadOnlyList} from '../readonly/ReadOnlyList.spec';
import {assertLengthAndIsEmpty} from '../../base/Queryable.spec';

export function testList(create: <T>(items?: Sequence<T>) => List<T>) {
    describe('List', function () {
        testReadOnlyList(create);

        describe('add()', function () {
            it('should add item into list', function () {
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

            it('should trigger "change" event on each item added', function () {
                const list: List<string> = create();
                const callback = jest.fn();

                list.changed.subscribe(callback);

                expect(callback).toHaveBeenCalledTimes(0);

                list.add('one');

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                    expect(change.index).toBe(0);
                    expect(change.item).toBe('one');
                    expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                }

                list.add('two');

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                    expect(change.index).toBe(1);
                    expect(change.item).toBe('two');
                    expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                }
            });
        });

        describe('addAll()', function () {
            it('should accept empty sequence', function () {
                const list: List<string> = create();

                expect(list.addAll([])).toBe(false);

                assertLengthAndIsEmpty(list, 0);
            });

            it('should add all items', function () {
                const list: List<string> = create();

                expect(list.addAll(['a'])).toBe(true);
                expect(list.toArray()).toEqual(['a']);

                assertLengthAndIsEmpty(list, 1);

                expect(list.addAll(['b', 'c'])).toBe(true);
                expect(list.toArray()).toEqual(['a', 'b', 'c']);

                assertLengthAndIsEmpty(list, 3);
            });

            it('should trigger "change" event on each item added', function () {
                const list: List<string> = create();
                const callback = jest.fn();

                list.changed.subscribe(callback);

                expect(callback).toHaveBeenCalledTimes(0);

                list.addAll(['one', 'two']);

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(2);

                    {
                        const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                    }

                    {
                        const change: ItemAddedListChange<string> = args.changes[1] as ItemAddedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('two');
                        expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                    }
                }

                list.addAll(['three', 'four', 'five']);

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(3);

                    {
                        const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.item).toBe('three');
                        expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                    }

                    {
                        const change: ItemAddedListChange<string> = args.changes[1] as ItemAddedListChange<string>;

                        expect(change.index).toBe(3);
                        expect(change.item).toBe('four');
                        expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                    }

                    {
                        const change: ItemAddedListChange<string> = args.changes[2] as ItemAddedListChange<string>;

                        expect(change.index).toBe(4);
                        expect(change.item).toBe('five');
                        expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                    }
                }
            });
        });

        describe('addIfAbsent()', function () {
            it('should add item if it is absent', function () {
                const list: List<string> = create();

                expect(list.addIfAbsent('a')).toBe(true);

                assertLengthAndIsEmpty(list, 1);

                expect(list.addIfAbsent('b')).toBe(true);

                assertLengthAndIsEmpty(list, 2);

                expect(list.addIfAbsent('b')).toBe(false);

                assertLengthAndIsEmpty(list, 2);
            });

            it('should trigger "change" event if item was added', function () {
                const list: List<string> = create();
                const callback = jest.fn();

                list.changed.subscribe(callback);

                expect(callback).toHaveBeenCalledTimes(0);

                list.addIfAbsent('one');

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                    expect(change.index).toBe(0);
                    expect(change.item).toBe('one');
                    expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                }

                list.addIfAbsent('two');

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                    expect(change.index).toBe(1);
                    expect(change.item).toBe('two');
                    expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                }

                list.addIfAbsent('two');

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemAddedListChange<string> = args.changes[0] as ItemAddedListChange<string>;

                    expect(change.index).toBe(1);
                    expect(change.item).toBe('two');
                    expect(change.type).toBe(ListChangeKind.ITEM_ADDED);
                }
            });
        });

        describe('clear()', function () {
            it('should clear list', function () {
                const list: List<string> = create(['one', 'two']);

                expect(list.clear()).toBe(true);

                assertLengthAndIsEmpty(list, 0);

                expect(list.clear()).toBe(false);
            });

            it('should trigger "change" event when list was cleared', function () {
                const list: List<string> = create(['one', 'two', 'three']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.clear();

                expect(callback).toHaveBeenCalledTimes(1);

                const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                expect(args.changes.length).toBe(1);

                const change: ListClearedListChange = args.changes[0] as ListClearedListChange;

                expect(change.itemsRemoved).toBe(3);
                expect(change.type).toBe(ListChangeKind.LIST_CLEARED);
            });
        });

        describe('insert()', function () {
            it('should insert item into list', function () {
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

            it('should throw if index out of bounds', function () {
                const list: List<string> = create();

                expect(() => {
                    list.insert(-1, 'one');
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    list.insert(1, 'one');
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should trigger "change" event for inserted item', function () {
                const list: List<string> = create();
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.insert(0, 'one');

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemInsertedListChange<string> = args.changes[0] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }
                }

                list.insert(1, 'two');

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemInsertedListChange<string> = args.changes[0] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('two');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }
                }

                list.insert(0, 'zero');

                expect(callback).toHaveBeenCalledTimes(3);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[2][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemInsertedListChange<string> = args.changes[0] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('zero');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }
                }
            });
        });

        describe('insertAll()', function () {
            it('should insert items at specified position', function () {
                const list: List<string> = create(['one', 'four']);

                expect(list.insertAll(1, ['two', 'three'])).toBe(true);
                expect(list.insertAll(1, [])).toBe(false);

                expect(list.length).toBe(4);
                expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
            });

            it('should throw if `index` is out of bounds', function () {
                const list: List<string> = create();

                expect(() => {
                    list.insertAll(1, ['one', 'two']);
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    list.insertAll(-1, ['one', 'two']);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should trigger "change" event for all inserted items', function () {
                const list: List<string> = create();
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.insertAll(0, ['one', 'two']);

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(2);

                    {
                        const change: ItemInsertedListChange<string> = args.changes[0] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }

                    {
                        const change: ItemInsertedListChange<string> = args.changes[1] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('two');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }
                }

                list.insertAll(2, ['three', 'four']);

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(2);

                    {
                        const change: ItemInsertedListChange<string> = args.changes[0] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.item).toBe('three');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }

                    {
                        const change: ItemInsertedListChange<string> = args.changes[1] as ItemInsertedListChange<string>;

                        expect(change.index).toBe(3);
                        expect(change.item).toBe('four');
                        expect(change.type).toBe(ListChangeKind.ITEM_INSERTED);
                    }
                }
            });
        });

        describe('remove()', function () {
            it('should return `false` if list does not contains the item', function () {
                const list: List<string> = create();

                expect(list.remove('itemThatIsNotInCollection')).toBe(false);
            });

            it('should return `true` if item was removed from list', function () {
                const list: List<string> = create(['one', 'two', 'three', 'four']);

                expect(list.remove('two')).toBe(true);

                assertLengthAndIsEmpty(list, 3);

                expect(list.remove('one')).toBe(true);

                assertLengthAndIsEmpty(list, 2);

                expect(list.remove('four')).toBe(true);

                assertLengthAndIsEmpty(list, 1);
            });

            it('should trigger "change" event when item was removed', function () {
                const list: List<string> = create(['one', 'two', 'three', 'one']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.remove('two');

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(1);

                    const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                    expect(change.index).toBe(1);
                    expect(change.item).toBe('two');
                    expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                }

                list.remove('one');

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(2);

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[1] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }
            });
        });

        describe('removeAll()', function () {
            it('should remove items containing in both lists', function () {
                const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

                assertLengthAndIsEmpty(list, 6);

                expect(list.removeAll(['a', 'b'])).toBe(true);
                expect(list.removeAll([])).toBe(false);

                assertLengthAndIsEmpty(list, 2);

                expect(list.toArray()).toEqual(['c', 'd']);
            });

            it('should remove items containing in both lists using custom equality comparator', function () {
                const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

                list.removeAll(['A', 'B']);

                assertLengthAndIsEmpty(list, 6);

                list.removeAll(['A', 'B'], IgnoreCaseEqualityComparator.get());

                assertLengthAndIsEmpty(list, 2);

                expect(list.toArray()).toEqual(['c', 'd']);
            });

            it('should trigger "changed" event for all removed items', function () {
                const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.removeAll(['a', 'b']);

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(4);

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[1] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('b');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[2] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[3] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(5);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }
            });
        });

        describe('removeBy()', function () {
            it('should remove items for whose predicate function returns `true`', function () {
                const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);

                list.removeBy((character: string): boolean => {
                    return character === 'a';
                });

                assertLengthAndIsEmpty(list, 3);

                expect(list.toArray()).toEqual(['b', 'c', 'd']);
            });
            it('should trigger "changed" event for all removed items', function () {
                const list: List<string> = create(['a', 'b', 'a', 'c', 'd', 'a']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.removeBy((actualItem) => {
                    return actualItem === 'a' || actualItem === 'b';
                });

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(4);

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[1] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('b');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[2] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[3] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(5);
                        expect(change.item).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }
            });
        });

        describe('removeAt()', function () {
            it('should remove item with specified index from list', function () {
                const list: List<string> = create(['one', 'two']);

                expect(list.removeAt(1)).toBe('two');

                expect(list.length).toBe(1);
                expect(list.toArray()).toEqual(['one']);

                expect(list.removeAt(0)).toBe('one');

                expect(list.length).toBe(0);
            });

            it('should throw if `index` argument is out of bounds', function () {
                const list: List<string> = create();

                expect(() => {
                    list.removeAt(-1);
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    list.removeAt(4);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should trigger "change" event for removed item', function () {
                const list: List<string> = create(['one', 'two']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.removeAt(1);

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('two');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }

                list.removeAt(0);

                expect(callback).toHaveBeenCalledTimes(2);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.item).toBe('one');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }
            });
        });

        describe('retainAll()', function () {
            it('should accept empty lists', function () {
                const list: List<string> = create(['one', 'two', 'three', 'four', 'five']);

                expect(list.retainAll([])).toBe(true);

                assertLengthAndIsEmpty(list, 0);

                expect(list.toArray()).toEqual([]);
            });

            it('should remove all items except those in specified list', function () {
                const list: List<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

                expect(list.retainAll(['one', 'Three'])).toBe(true);

                assertLengthAndIsEmpty(list, 2);

                expect(list.toArray()).toEqual(['one', 'Three']);
            });

            it('should use custom equality comparator', function () {
                const list: List<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);

                expect(list.retainAll(['one', 'Three'], IgnoreCaseEqualityComparator.get())).toBe(true);

                assertLengthAndIsEmpty(list, 4);

                expect(list.toArray()).toEqual(['one', 'three', 'One', 'Three']);
            });

            it('should trigger "change" event for all removed items', function () {
                const list: List<string> = create(['one', 'two', 'three', 'One', 'Two', 'Three']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                list.retainAll(['one', 'Three'], IgnoreCaseEqualityComparator.get());

                expect(callback).toHaveBeenCalledTimes(1);

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(2);

                    {
                        const change: ItemRemovedListChange<string> = args.changes[0] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.item).toBe('two');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }

                    {
                        const change: ItemRemovedListChange<string> = args.changes[1] as ItemRemovedListChange<string>;

                        expect(change.index).toBe(4);
                        expect(change.item).toBe('Two');
                        expect(change.type).toBe(ListChangeKind.ITEM_REMOVED);
                    }
                }
            });
        });

        describe('setAt()', function () {
            it('should set value of element at specified index', function () {
                const list: List<string> = create(['a', 'b', 'c']);

                expect(list.setAt(0, 'one')).toBe('a');
                expect(list.setAt(1, 'two')).toBe('b');
                expect(list.setAt(2, 'three')).toBe('c');
            });

            it('should throw IndexOutOfBoundsException', function () {
                const list: List<string> = create();

                expect(() => {
                    list.setAt(0, '');
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should trigger "changed" event after value was replaced', function () {
                const list: List<string> = create(['a', 'b', 'c']);
                const callback = jest.fn();

                list.changed.subscribe(callback);

                expect(list.setAt(0, 'one')).toBe('a');
                expect(list.setAt(1, 'two')).toBe('b');
                expect(list.setAt(2, 'three')).toBe('c');

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[0][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemReplacedListChange<string> = args.changes[0] as ItemReplacedListChange<string>;

                        expect(change.index).toBe(0);
                        expect(change.newValue).toBe('one');
                        expect(change.oldValue).toBe('a');
                        expect(change.type).toBe(ListChangeKind.ITEM_REPLACED);
                    }
                }

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[1][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemReplacedListChange<string> = args.changes[0] as ItemReplacedListChange<string>;

                        expect(change.index).toBe(1);
                        expect(change.newValue).toBe('two');
                        expect(change.oldValue).toBe('b');
                        expect(change.type).toBe(ListChangeKind.ITEM_REPLACED);
                    }
                }

                {
                    const args: ListChangedEventArgs<string> = callback.mock.calls[2][0];

                    expect(args.changes.length).toBe(1);

                    {
                        const change: ItemReplacedListChange<string> = args.changes[0] as ItemReplacedListChange<string>;

                        expect(change.index).toBe(2);
                        expect(change.newValue).toBe('three');
                        expect(change.oldValue).toBe('c');
                        expect(change.type).toBe(ListChangeKind.ITEM_REPLACED);
                    }
                }

            });
        });
    });
}
