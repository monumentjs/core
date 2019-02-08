import {
    IgnoreCaseComparator,
    IgnoreCaseEqualityComparator,
    IndexOutOfBoundsException,
    InvalidArgumentException,
    InvalidOperationException,
    isEven,
    IterableEqualityComparator,
    NamedPool,
    NoSuchItemException,
    RangeException,
    ReadOnlyCollection,
    ReadOnlyMultiValueMap,
    Sequence,
    SortOrder,
    times
} from '../../../../..';
import { testSequence } from '../../base/Sequence.spec';

interface Book {
    authors: ReadOnlyCollection<string>;
}

export function assertLengthAndIsEmpty<I>(items: ReadOnlyCollection<I>, expectedLength: number): void {
    expect(items.length).toBe(expectedLength);
    expect(items.isEmpty).toBe(expectedLength === 0);
}

export function testReadOnlyCollection(create: <T>(items?: Sequence<T>) => ReadOnlyCollection<T>) {
    describe('ReadOnlyCollection', function() {
        testSequence(create);

        const iterableEqualityComparator: IterableEqualityComparator<string> = new IterableEqualityComparator();

        describe('isEmpty', function() {
            it('should be true when collection is empty', function() {
                const empty = create([]);
                const notEmpty = create(['a', 'b']);

                assertLengthAndIsEmpty(empty, 0);
                assertLengthAndIsEmpty(notEmpty, 2);
            });
        });

        describe('aggregate()', function() {
            it('should aggregate list data into new value', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const map: NamedPool<boolean> = list.aggregate((obj: NamedPool<boolean>, item: string): NamedPool<boolean> => {
                    obj[item] = true;

                    return obj;
                }, {});

                expect(map).toEqual({
                    one: true,
                    two: true,
                    three: true
                });
            });
        });

        describe('all()', function() {
            it('should determine whether all elements of a sequence satisfy a condition', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.all(
                        (word: string): boolean => {
                            return word.length >= 3;
                        }
                    )
                ).toBe(true);

                expect(
                    list.all(
                        (word: string): boolean => {
                            return word.length < 5;
                        }
                    )
                ).toBe(false);
            });

            it('should throw if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.all(
                        (): boolean => {
                            return true;
                        }
                    );
                }).toThrow(InvalidOperationException);
            });
        });

        describe('any()', function() {
            it('should determine whether any of elements satisfy a condition', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.any(
                        (word: string): boolean => {
                            return word.length === 3;
                        }
                    )
                ).toBe(true);

                expect(
                    list.any(
                        (word: string): boolean => {
                            return word.length === 4;
                        }
                    )
                ).toBe(false);

                expect(
                    list.any(
                        (word: string): boolean => {
                            return word.length === 5;
                        }
                    )
                ).toBe(true);
            });

            it('should throw if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.any(
                        (): boolean => {
                            return true;
                        }
                    );
                }).toThrow(InvalidOperationException);
            });
        });

        describe('average()', function() {
            it('should calculate average value', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'six']);

                expect(
                    list.average(
                        (word: string): number => {
                            return word.length;
                        }
                    )
                ).toBe(3);
            });

            it('should throw if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.average(
                        (): number => {
                            return 0;
                        }
                    );
                }).toThrow(InvalidOperationException);
            });
        });

        describe('chunk', function() {
            it('should split collection into few collections of specified size', function() {
                const list: ReadOnlyCollection<number> = create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                const collections: ReadOnlyCollection<Iterable<number>> = list.chunk(3);

                expect(collections.length).toBe(4);
                expect([...collections.toArray()[0]].length).toBe(3);
                expect([...collections.toArray()[0]]).toEqual([1, 2, 3]);
                expect([...collections.toArray()[1]].length).toBe(3);
                expect([...collections.toArray()[1]]).toEqual([4, 5, 6]);
                expect([...collections.toArray()[2]].length).toBe(3);
                expect([...collections.toArray()[2]]).toEqual([7, 8, 9]);
                expect([...collections.toArray()[3]].length).toBe(1);
                expect([...collections.toArray()[3]]).toEqual([10]);
            });
        });

        describe('concat()', function() {
            it('should return concatenation of lists', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.concat(['four'], ['five']).toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
                expect(list.length).toBe(3);
            });
        });

        describe('contains()', function() {
            it('should determine whether collection contains specified item', function() {
                const source: ReadOnlyCollection<string> = create(['one', 'two']);

                expect(source.contains('one')).toBe(true);
                expect(source.contains('two')).toBe(true);
                expect(source.contains('three')).toBe(false);
            });

            it('should determine whether collection contains specified item using custom equality comparator', function() {
                const source: ReadOnlyCollection<string> = create(['one', 'two', 'THREE']);

                expect(source.contains('One', IgnoreCaseEqualityComparator.get())).toBe(true);
                expect(source.contains('TWO', IgnoreCaseEqualityComparator.get())).toBe(true);
                expect(source.contains('three', IgnoreCaseEqualityComparator.get())).toBe(true);
            });
        });

        describe('containsAll()', function() {
            it('should determine whether collection contains all specified items', function() {
                const source: ReadOnlyCollection<string> = create(['one', 'two']);

                expect(source.containsAll([])).toBe(false);
                expect(source.containsAll(['one'])).toBe(true);
                expect(source.containsAll(['two'])).toBe(true);
                expect(source.containsAll(['three'])).toBe(false);
            });

            it('should determine whether collection contains all specified items using custom equality comparator', function() {
                const source: ReadOnlyCollection<string> = create(['one', 'two', 'THREE']);

                expect(source.containsAll([], IgnoreCaseEqualityComparator.get())).toBe(false);
                expect(source.containsAll(['One'], IgnoreCaseEqualityComparator.get())).toBe(true);
                expect(source.containsAll(['TWO'], IgnoreCaseEqualityComparator.get())).toBe(true);
                expect(source.containsAll(['three'], IgnoreCaseEqualityComparator.get())).toBe(true);
            });
        });

        describe('count()', function() {
            it('should calculates count of items matching predicate', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.count(
                        (word: string): boolean => {
                            return word.length > 3;
                        }
                    )
                ).toBe(1);
            });
        });

        describe('distinct()', function() {
            it('should return list of distinct items', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'One']);
                const distinctItems: ReadOnlyCollection<string> = list.distinct(IgnoreCaseEqualityComparator.get());

                expect(list.length).toBe(3);
                expect(list.toArray()).toEqual(['one', 'two', 'One']);

                expect(distinctItems.length).toBe(2);
                expect(distinctItems.toArray()).toEqual(['one', 'two']);
            });
        });

        describe('except()', function() {
            it('should return list without specified items using custom comparator', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const filteredList: ReadOnlyCollection<string> = list.except(['one', 'Five'], IgnoreCaseEqualityComparator.get());

                expect(filteredList).not.toEqual(list);
                expect(filteredList.toArray()).toEqual(['two', 'Three', 'Five']);
            });

            it('should return list without specified items using default comparator', function() {
                const source: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const filteredList1: ReadOnlyCollection<string> = source.except(['Three']);

                expect(filteredList1).not.toEqual(source);
                expect(filteredList1.toArray()).toEqual(['two', 'ONE', 'one', 'One']);

                const filteredList2: ReadOnlyCollection<string> = source.except(['Five']);

                expect(filteredList2).not.toEqual(source);
                expect(filteredList2.toArray()).toEqual(['two', 'ONE', 'one', 'Three', 'One', 'Five']);
            });
        });

        describe('findAll(predicate)', function() {
            it('should return list of items for whose predicate function returned `true`', function() {
                const list: ReadOnlyCollection<number> = create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                const result: ReadOnlyCollection<number> = list.findAll(isEven);

                expect(result.length).toBe(5);
                expect(result.toArray()).toEqual([2, 4, 6, 8, 10]);
            });
        });

        describe('findAll(predicate, limit)', function() {
            it('should return list of items for whose predicate function returned `true`', function() {
                const list: ReadOnlyCollection<number> = create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                const result: ReadOnlyCollection<number> = list.findAll(isEven, 2);

                expect(result.length).toBe(2);
                expect(result.toArray()).toEqual([2, 4]);
            });
        });

        describe('findAll(predicate, limit, offset)', function() {
            it('should return list of items for whose predicate function returned `true`', function() {
                const list: ReadOnlyCollection<number> = create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                const result: ReadOnlyCollection<number> = list.findAll(isEven, 2, 3);

                expect(result.length).toBe(2);
                expect(result.toArray()).toEqual([8, 10]);
            });
        });

        describe('first(predicate)', function() {
            it('should return first item matching predicate', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.first(
                        (word: string): boolean => {
                            return word.length === 3;
                        }
                    )
                ).toBe('one');

                expect(
                    list.first(
                        (word: string): boolean => {
                            return word.length === 4;
                        }
                    )
                ).toBe(undefined);
            });
        });

        describe('first(predicate, fallback)', function() {
            it('should return first item matching predicate', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.first(
                        (word: string): boolean => {
                            return word.length === 4;
                        },
                        () => 'fallback'
                    )
                ).toBe('fallback');
            });
        });

        describe('firstOrDefault(fallback)', function() {
            it('should return fallback value if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(list.firstOrDefault(() => 'fallback')).toBe('fallback');
            });

            it('should return first item of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.firstOrDefault(() => 'fallback')).toBe('one');
            });
        });

        describe('forEach(iterator)', function() {
            it('should work for empty collections', function() {
                const items: ReadOnlyCollection<string> = create();
                const iterator: jest.Mock = jest.fn();

                items.forEach(iterator);

                expect(iterator).toHaveBeenCalledTimes(0);
            });

            it('should iterate over list with single item', function() {
                const items: ReadOnlyCollection<string> = create(['one']);
                const iterator: jest.Mock = jest.fn();

                items.forEach(iterator);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
            });

            it('should iterate over list', function() {
                const items: ReadOnlyCollection<string> = create(['one', 'two']);
                const iterator: jest.Mock = jest.fn();

                items.forEach(iterator);

                expect(iterator).toHaveBeenCalledTimes(2);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
                expect(iterator).toHaveBeenNthCalledWith(2, 'two', 1);
            });
        });

        describe('forEach(iterator, startIndex)', function() {
            it('should work for empty collection', function() {
                const collection = create([]);
                const iterator = jest.fn();

                collection.forEach(iterator, 0);

                expect(iterator).toHaveBeenCalledTimes(0);
            });

            it('should visit first element in single element collection', function() {
                const collection = create(['one']);
                const iterator = jest.fn();

                collection.forEach(iterator, 0);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
            });

            it('should visit each element with index greater or equal to start index', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                collection.forEach(iterator, 1);

                expect(iterator).toHaveBeenCalledTimes(3);
                expect(iterator).toHaveBeenNthCalledWith(1, 'two', 1);
                expect(iterator).toHaveBeenNthCalledWith(2, 'three', 2);
                expect(iterator).toHaveBeenNthCalledWith(3, 'four', 3);
            });

            it('should visit the last element in collection', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                collection.forEach(iterator, 3);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'four', 3);
            });

            it('should throw IndexOutOfBoundsException if start index is less than zero and collection has elements', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, -1);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw IndexOutOfBoundsException if start index is less than zero and collection has elements', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, -10);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw IndexOutOfBoundsException if start index is less than zero and collection is empty', function() {
                const collection = create();
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, -1);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw IndexOutOfBoundsException if start index is less than zero and collection is empty', function() {
                const collection = create();
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, -10);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw IndexOutOfBoundsException if start index is equal to collection length', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, 4);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw IndexOutOfBoundsException if start index is greater than collection length', function() {
                const collection = create(['one', 'two', 'three', 'four']);
                const iterator = jest.fn();

                expect(() => {
                    collection.forEach(iterator, 40);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should not throw IndexOutOfBoundsException if start index is zero and collection is empty', function() {
                const collection = create([]);
                const iterator = jest.fn();

                collection.forEach(iterator, 0);

                expect(iterator).toHaveBeenCalledTimes(0);
            });
        });

        describe('forEach(iterator, startIndex, count)', function() {
            it('should work for empty collection', function() {
                const collection = create();
                const iterator = jest.fn();

                collection.forEach(iterator, 0, 0);

                expect(iterator).toHaveBeenCalledTimes(0);
            });

            it('should iterate collection with single element', function() {
                const collection = create(['one']);
                const iterator = jest.fn();

                collection.forEach(iterator, 0, 1);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
            });

            it('should iterate collection with few element', function() {
                const collection = create(['one']);
                const iterator = jest.fn();

                collection.forEach(iterator, 0, 1);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
            });
        });

        describe('forEachBack(iterator)', function() {
            it('should work for empty collections', function() {
                const items: ReadOnlyCollection<string> = create();
                const iterator: jest.Mock = jest.fn();

                items.forEachBack(iterator);

                expect(iterator).toHaveBeenCalledTimes(0);
            });

            it('should iterate over list with single item', function() {
                const items: ReadOnlyCollection<string> = create(['one']);
                const iterator: jest.Mock = jest.fn();

                items.forEachBack(iterator);

                expect(iterator).toHaveBeenCalledTimes(1);
                expect(iterator).toHaveBeenNthCalledWith(1, 'one', 0);
            });

            it('should iterate over list', function() {
                const items: ReadOnlyCollection<string> = create(['one', 'two']);
                const iterator: jest.Mock = jest.fn();

                items.forEachBack(iterator);

                expect(iterator).toHaveBeenCalledTimes(2);
                expect(iterator).toHaveBeenNthCalledWith(1, 'two', 1);
                expect(iterator).toHaveBeenNthCalledWith(2, 'one', 0);
            });
        });

        describe('groupBy(keySelector)', function() {
            it('should return list of grouped items using default comparator', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                const groups: ReadOnlyMultiValueMap<number, string> = list.groupBy(
                    (word: string): number => {
                        return word.length;
                    }
                );

                expect(groups.length).toBe(2);
                expect(groups.keys).toContain(3);
                expect(groups.keys).toContain(5);
                expect(iterableEqualityComparator.equals(groups.get(3), ['one', 'two'])).toBe(true);
                expect(iterableEqualityComparator.equals(groups.get(5), ['three'])).toBe(true);
            });
        });

        describe('groupBy(keySelector, keyComparator)', function() {
            it('should return list of grouped items using custom comparator', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const groups: ReadOnlyMultiValueMap<string, string> = list.groupBy<string>((word: string): string => {
                    return word[0].toLowerCase();
                }, IgnoreCaseEqualityComparator.get());

                expect(groups.length).toBe(2);
                expect(groups.containsKey('t')).toBe(true);
                expect(groups.containsKey('o')).toBe(true);
                expect(iterableEqualityComparator.equals(groups.get('t'), ['two', 'Three'])).toBe(true);
                expect(iterableEqualityComparator.equals(groups.get('o'), ['ONE', 'one', 'One'])).toBe(true);
            });
        });

        describe('intersect(items)', function() {
            it('should return list without specified items using custom comparator', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const filteredList: ReadOnlyCollection<string> = list.intersect(
                    create(['one', 'Five']),
                    IgnoreCaseEqualityComparator.get()
                );

                expect(filteredList).not.toEqual(list);
                expect(filteredList.toArray()).toEqual(['ONE', 'one', 'One']);
            });

            it('should return list without specified items using default comparator', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                let filteredList: ReadOnlyCollection<string> = list.intersect(create(['Three', 'Four']));

                expect(filteredList).not.toEqual(list);
                expect(filteredList.toArray()).toEqual(['Three']);

                filteredList = list.intersect(create(['Five']));

                expect(filteredList).not.toEqual(list);
                expect(filteredList.toArray()).toEqual([]);
            });
        });

        describe('join()', function() {
            it('should join lists using custom equality comparator', function() {
                const listA: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const listB: ReadOnlyCollection<string> = create(['Ten', 'Once', 'Twelve']);
                const combo: ReadOnlyCollection<string[]> = listA.join(
                    listB,
                    (word: string): string => {
                        return word[0];
                    },
                    (word: string): string => {
                        return word[0];
                    },
                    function(x: string, y: string): string[] {
                        return [x, y];
                    },
                    IgnoreCaseEqualityComparator.get()
                );

                expect(combo.toArray()).toEqual([
                    ['two', 'Ten'],
                    ['two', 'Twelve'],
                    ['ONE', 'Once'],
                    ['one', 'Once'],
                    ['Three', 'Ten'],
                    ['Three', 'Twelve'],
                    ['One', 'Once']
                ]);
            });
        });

        describe('last()', function() {
            it('should return last item matching predicate', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.last(
                        (word: string): boolean => {
                            return word.length === 3;
                        }
                    )
                ).toBe('two');

                expect(
                    list.last(
                        (word: string): boolean => {
                            return word.length === 4;
                        }
                    )
                ).toBe(undefined);

                expect(
                    list.last(
                        (word: string): boolean => {
                            return word.length === 4;
                        },
                        () => 'fallback'
                    )
                ).toBe('fallback');
            });
        });

        describe('lastOrDefault()', function() {
            it('should return fallback value if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(list.lastOrDefault(() => 'fallback')).toBe('fallback');
            });

            it('should return last item of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.lastOrDefault(() => 'fallback')).toBe('three');
            });
        });

        describe('map()', function() {
            it('should return list of selected values', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                const firstChars: ReadOnlyCollection<string> = list.map(
                    (word: string): string => {
                        return word[0];
                    }
                );

                expect(firstChars.length).toBe(3);
                expect(firstChars.toArray()).toEqual(['o', 't', 't']);
            });
        });

        describe('max()', function() {
            it('should return maximal value', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);

                expect(
                    list.max(
                        (word: string): number => {
                            return word.length;
                        }
                    )
                ).toBe(5);
            });

            it('should throw if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.max(
                        (word: string): number => {
                            return word.length;
                        }
                    );
                }).toThrow(InvalidOperationException);
            });
        });

        describe('min()', function() {
            it('should return minimal value', function() {
                const list: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);

                expect(
                    list.min(
                        (word: string): number => {
                            return word.length;
                        }
                    )
                ).toBe(3);
            });

            it('should throw if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.min(
                        (word: string): number => {
                            return word.length;
                        }
                    );
                }).toThrow(InvalidOperationException);
            });
        });

        describe('orderBy()', function() {
            it('should return sorted list using ascending sort order', function() {
                const originalList: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const orderedList: ReadOnlyCollection<string> = originalList.orderBy(
                    (word: string): string => {
                        return word.slice(0, 2);
                    },
                    IgnoreCaseComparator.get(),
                    SortOrder.ASCENDING
                );

                expect(orderedList.toArray()).toEqual(['ONE', 'one', 'One', 'Three', 'two']);
            });

            it('should return sorted list using custom no sort order', function() {
                const originalList: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const orderedList: ReadOnlyCollection<string> = originalList.orderBy(
                    (word: string): string => {
                        return word.slice(0, 2);
                    },
                    IgnoreCaseComparator.get(),
                    SortOrder.NONE
                );

                expect(orderedList.toArray()).toEqual(['two', 'ONE', 'one', 'Three', 'One']);
            });

            it('should return sorted list using descending sort order', function() {
                const originalList: ReadOnlyCollection<string> = create(['two', 'ONE', 'one', 'Three', 'One']);
                const orderedList: ReadOnlyCollection<string> = originalList.orderBy(
                    (word: string): string => {
                        return word.slice(0, 2);
                    },
                    IgnoreCaseComparator.get(),
                    SortOrder.DESCENDING
                );

                expect(orderedList.toArray()).toEqual(['two', 'Three', 'ONE', 'one', 'One']);
            });
        });

        describe('random()', function() {
            it('should return random item', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const random: string[] = [];

                times(10, () => {
                    random.push(list.random());
                });

                for (const item of random) {
                    expect(list.contains(item));
                }
            });

            it('should throw NoSuchItemException if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.random();
                }).toThrow(NoSuchItemException);
            });
        });

        describe('reverse()', function() {
            it('should return reversed list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const reversedList: ReadOnlyCollection<string> = list.reverse();

                expect(reversedList.toArray()).toEqual(['three', 'two', 'one']);
            });
        });

        describe('selectMany()', function() {
            it('should return list of selected values', function() {
                const books: ReadOnlyCollection<Book> = create([
                    {
                        authors: create(['Johan Rowling'])
                    },
                    {
                        authors: create(['Steve MacConnell', 'Kent Beck'])
                    }
                ]);

                const authorNames: ReadOnlyCollection<string> = books.selectMany<string, string>(
                    (book: Book) => {
                        return book.authors;
                    },
                    (book: Book, authorFullName: string): string => {
                        return authorFullName.split(' ')[0];
                    }
                );

                expect(authorNames.length).toBe(3);

                expect(authorNames.toArray()).toEqual(['Johan', 'Steve', 'Kent']);
            });
        });

        describe('skip()', function() {
            it('should return slice of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.skip(1).toArray()).toEqual(['two', 'three']);
            });

            it('should throw if offset is out of bounds', function() {
                const list: ReadOnlyCollection<string> = create();

                list.skip(0);
                list.skip(10);

                expect(() => {
                    list.skip(-10);
                }).toThrow(IndexOutOfBoundsException);
            });
        });

        describe('skipWhile()', function() {
            it('should returns slice of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const slice: ReadOnlyCollection<string> = list.skipWhile(
                    (word: string): boolean => {
                        return word[0] !== 't';
                    }
                );

                expect(slice.toArray()).toEqual(['two', 'three']);
            });

            it('should works with empty lists', function() {
                const list: ReadOnlyCollection<string> = create();
                const slice: ReadOnlyCollection<string> = list.skipWhile(
                    (word: string): boolean => {
                        return word[0] !== 't';
                    }
                );

                expect(slice.toArray()).toEqual([]);
            });
        });

        describe('slice()', function() {
            it('should return slice of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.slice(1, 1).toArray()).toEqual(['two']);
                expect(list.slice(2, 1).toArray()).toEqual(['three']);
                expect(list.slice(1, 2).toArray()).toEqual(['two', 'three']);
            });

            it('should throw if slice range is invalid', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(() => {
                    list.slice(0, 1);
                }).toThrow(RangeException);
                expect(() => {
                    list.slice(-1, 0);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should works with empty lists', function() {
                const list: ReadOnlyCollection<string> = create();

                expect(list.slice(0, 0).toArray()).toEqual([]);
            });
        });

        describe('sum()', function() {
            it('should return sum of selected values', function() {
                const list: ReadOnlyCollection<string> = create(['one']);

                expect(
                    list.sum(
                        (item: string): number => {
                            return item.length;
                        }
                    )
                ).toBe(3);
            });

            it('should return sum of selected values', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(
                    list.sum(
                        (item: string): number => {
                            return item.length;
                        }
                    )
                ).toBe(11);
            });

            it('should throw InvalidOperationException if list is empty', function() {
                const list: ReadOnlyCollection<string> = create();
                const mock = jest.fn();

                expect(() => {
                    list.sum(mock);
                }).toThrow(InvalidOperationException);
            });
        });

        describe('take()', function() {
            it('should return slice of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.take(2).toArray()).toEqual(['one', 'two']);
            });

            it('should throw if length is out of bounds', function() {
                const list: ReadOnlyCollection<string> = create();

                list.take(0);
                list.take(1);

                expect(() => {
                    list.take(-1);
                }).toThrow(InvalidArgumentException);
            });

            it('should return slice of list', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const slice: ReadOnlyCollection<string> = list.takeWhile(
                    (word: string): boolean => {
                        return word[0] !== 't';
                    }
                );

                expect(slice.toArray()).toEqual(['one']);
            });
        });

        describe('takeWhile()', function() {
            it('should work with empty lists', function() {
                const list: ReadOnlyCollection<string> = create();
                const slice: ReadOnlyCollection<string> = list.takeWhile(
                    (word: string): boolean => {
                        return word[0] !== 't';
                    }
                );

                expect(slice.toArray()).toEqual([]);
            });
        });

        describe('union()', function() {
            it('should return union of lists', function() {
                const listA: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const listB: ReadOnlyCollection<string> = create(['four', 'one', 'two', 'three', 'five']);
                const union: ReadOnlyCollection<string> = listA.union(listB);

                expect(union.length).toBe(5);
                expect(union.toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
                expect(listA.length).toBe(3);
            });
        });

        describe('zip()', function() {
            it('should return list of combined items', function() {
                const listA: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const listB: ReadOnlyCollection<string> = create(['four', 'five']);
                const listC: ReadOnlyCollection<string> = create(['four', 'five', 'six', 'seven']);
                const comboAB: ReadOnlyCollection<string> = listA.zip(
                    listB,
                    (x: string, y: string): string => {
                        return `${x}+${y}`;
                    }
                );
                const comboAC: ReadOnlyCollection<string> = listA.zip(
                    listC,
                    (x: string, y: string): string => {
                        return `${x}+${y}`;
                    }
                );

                expect(comboAB.toArray()).toEqual(['one+four', 'two+five']);

                expect(comboAC.toArray()).toEqual(['one+four', 'two+five', 'three+six']);
            });

            it('should return empty queryable if current list or other list is empty', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);
                const mock = jest.fn();

                expect(list.zip([], mock).length).toBe(0);
            });

            it('should return empty queryable if current list or other list is empty', function() {
                const list: ReadOnlyCollection<string> = create();
                const mock = jest.fn();

                expect(list.zip(['one', 'two', 'three'], mock).length).toBe(0);
            });
        });

        describe('toJSON()', function() {
            it('should serialize list to pure array', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.toJSON() instanceof Array).toBe(true);
                expect(list.toJSON()).toEqual(['one', 'two', 'three']);
            });
        });

        describe('toArray()', function() {
            it('should return pure array', function() {
                const list: ReadOnlyCollection<string> = create(['one', 'two', 'three']);

                expect(list.toArray() instanceof Array).toBe(true);
                expect(list.toArray()).toEqual(['one', 'two', 'three']);
            });
        });
    });
}
