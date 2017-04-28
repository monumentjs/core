import {List} from '../../../../src/Core/Collections/List';
import {Collection} from '../../../../src/Core/Collections/Collection';
import {IndexOutOfBoundsException} from '../../../../src/Core/Exceptions/IndexOutOfBoundsException';
import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';
import {InvalidOperationException} from '../../../../src/Core/Exceptions/InvalidOperationException';
import {IgnoreCaseComparator} from '../../../../src/Core/Text/IgnoreCaseComparator';
import {InvalidArgumentException} from '../../../../src/Core/Exceptions/InvalidArgumentException';
import {Grouping} from '../../../../src/Core/Collections/Grouping';
import {SortOrder} from '../../../../src/Core/Collections/SortOrder';
import {RangeException} from '../../../../src/Core/Exceptions/RangeException';


describe('List', () => {
    let list: List<string> = null;


    beforeEach(() => {
        expect(function () {
            list = new List<string>();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('creates new instance of List class', () => {
            expect(list).toBeInstanceOf(List);
            expect(list).toBeInstanceOf(Collection);
        });
    });


    describe(`List.generate()`, () => {
        it(`throws if 'generator' argument is not defined`, () => {
            expect(() => {
                List.generate(undefined, 1);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                List.generate(null, 1);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'length' argument is not defined`, () => {
            expect(() => {
                List.generate(() => 1, undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                List.generate(() => 1, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'length' argument is out of bounds`, () => {
            expect(() => {
                List.generate(() => 1, -1);
            }).toThrowError(RangeException);
        });

        it(`returns new list containing specified amount of generated items`, () => {
            let numbers: List<number> = List.generate((index) => index, 3);

            expect(numbers.length).toBe(3);
            expect(numbers[0]).toBe(0);
            expect(numbers[1]).toBe(1);
            expect(numbers[2]).toBe(2);
        });
    });


    describe(`List.repeat()`, () => {
        it(`throws if 'times' argument is not defined`, () => {
            expect(() => {
                List.repeat(1, undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                List.repeat(1, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'times' argument is out of bounds`, () => {
            expect(() => {
                List.repeat(1, -1);
            }).toThrowError(RangeException);
        });

        it(`returns new list containing specified amount of generated items`, () => {
            let numbers: List<number> = List.repeat(1, 3);

            expect(numbers.length).toBe(3);
            expect(numbers[0]).toBe(1);
            expect(numbers[1]).toBe(1);
            expect(numbers[2]).toBe(1);
        });
    });


    describe(`List.range()`, () => {
        it(`throws if 'start' argument is not defined`, () => {
            expect(() => {
                List.range(undefined, 3);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                List.range(null, 3);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'end' argument is not defined`, () => {
            expect(() => {
                List.range(0, undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                List.range(0, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'step' argument is not defined`, () => {
            expect(() => {
                List.range(0, 3, undefined);
            }).not.toThrowError(ArgumentNullException);

            expect(() => {
                List.range(0, 3, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if range bounds are invalid`, () => {
            expect(() => {
                List.range(0, -1);
            }).toThrowError(RangeException);
        });

        it(`returns new list containing specified amount of generated items`, () => {
            let numbers: List<number> = List.range(0, 3);

            expect(numbers.length).toBe(3);
            expect(numbers[0]).toBe(0);
            expect(numbers[1]).toBe(1);
            expect(numbers[2]).toBe(2);
        });
    });


    describe('#insert()', () => {
        it(`throws if index is not defined`, () => {
            expect(() => {
                list.insert('one', undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                list.insert('one', null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if index out of bounds`, () => {
            expect(() => {
                list.insert('one', -1);
            }).toThrowError(IndexOutOfBoundsException);

            expect(() => {
                list.insert('one', 1);
            }).toThrowError(IndexOutOfBoundsException);
        });

        it('insert item into list', () => {
            expect(list.length).toEqual(0);

            list.insert('one', 0);

            expect(list.length).toEqual(1);
            expect(list.toArray()).toEqual(['one']);

            list.insert('two', 1);

            expect(list.length).toEqual(2);
            expect(list.toArray()).toEqual(['one', 'two']);

            list.insert('three', 0);

            expect(list.length).toEqual(3);
            expect(list.toArray()).toEqual(['three', 'one', 'two']);
        });
    });


    describe(`#insertRange()`, () => {
        it(`throws when 'items' argument is not defined`, () => {
            expect(() => {
                list.insertRange(null, 0);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws when 'index' argument is not defined`, () => {
            expect(() => {
                list.insertRange(['one', 'two'], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'index' is out of bounds`, () => {
            expect(() => {
                list.insertRange(['one', 'two'], 1);
            }).toThrowError(IndexOutOfBoundsException);

            expect(() => {
                list.insertRange(['one', 'two'], -1);
            }).toThrowError(IndexOutOfBoundsException);
        });

        it(`inserts items at specified position`, () => {
            list = new List(['one', 'four']);

            list.insertRange(['two', 'three'], 1);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
        });
    });


    describe('#removeAt()', () => {
        it(`throws if 'index' argument is not defined`, () => {
            list = new List(['one', 'four']);

            expect(() => {
                list.removeAt(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'index' argument is out of bounds`, () => {
            expect(() => {
                list.removeAt(-1);
            }).toThrowError(IndexOutOfBoundsException);

            expect(() => {
                list.removeAt(4);
            }).toThrowError(IndexOutOfBoundsException);
        });

        it('removes item with specified index from list', () => {
            list = new List(['one', 'two']);

            expect(() => {
                list.removeAt(2);
            }).toThrowError(IndexOutOfBoundsException);

            list.removeAt(1);
            
            expect(list.length).toEqual(1);
            expect(list.toArray()).toEqual(['one']);

            list.removeAt(0);
            
            expect(list.length).toEqual(0);
        });
    });


    describe('#indexOf()', () => {
        it(`throws if 'startIndex' argument is 'null'`, () => {
            expect(() => {
                list.indexOf('one', null);
            }).toThrowError(ArgumentNullException);
        });

        it(`does not throws if 'startIndex' argument is 'undefined'`, () => {
            expect(() => {
                list.indexOf('one');
            }).not.toThrow();
        });

        it(`does not throws if 'startIndex' argument is 0 and list length is 0'`, () => {
            expect(() => {
                list.indexOf('one', 0);
            }).not.toThrow();
        });

        it('finds index of given item starting from first element', () => {
            list = new List(['one', 'two']);

            expect(list.indexOf('one')).toEqual(0);
            expect(list.indexOf('two')).toEqual(1);
            expect(list.indexOf('three')).toEqual(-1);
        });

        it(`throws if 'startIndex' is out of bounds`, () => {
            expect(() => {
                list.indexOf('one', 1);
            }).toThrowError(IndexOutOfBoundsException);
        });

        it(`finds index of given item starting from specified index`, () => {
            list = new List(['one', 'two']);

            expect(list.indexOf('one', 1)).toEqual(-1);
            expect(list.indexOf('two', 1)).toEqual(1);
        });

        it(`finds index of given item in specified range`, () => {
            list = new List(['one', 'two', 'three', 'four']);

            expect(list.indexOf('four', 0, 2)).toBe(-1);
            expect(list.indexOf('four', 0, 4)).toBe(3);
        });

        it(`throws if search range is out of bounds`, () => {
            list = new List(['one', 'two', 'three', 'four']);

            expect(() => {
                list.indexOf('one', 0, -1);
            }).toThrowError(InvalidArgumentException);

            expect(() => {
                list.indexOf('one', 0, 5);
            }).toThrowError(InvalidArgumentException);
        });

        it(`finds index of given item using custom equality comparator`, () => {
            list = new List(['one', 'two']);

            expect(list.indexOf('ONE')).toBe(-1);
            expect(list.indexOf('ONE', 0, list.length, IgnoreCaseComparator.instance)).toBe(0);
            expect(list.indexOf('ONE', 1, list.length - 1, IgnoreCaseComparator.instance)).toBe(-1);
            expect(list.indexOf('THREE', 0, list.length, IgnoreCaseComparator.instance)).toBe(-1);
        });
    });


    describe(`#removeBy()`, () => {
        it(`throws if 'predicate' argument is not defined`, () => {
            expect(() => {
                list.removeBy(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`removes items for whose predicate function returns 'true'`, () => {
            list = new List(['a', 'b', 'a', 'c', 'd', 'a']);

            list.removeBy((character: string): boolean => {
                return character === 'a';
            });

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['b', 'c', 'd']);
        });
    });


    describe(`#removeAll()`, () => {
        it(`throws if 'other' argument is not defined`, () => {
            expect(() => {
                list.removeAll(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`removes items containing in both lists`, () => {
            list = new List(['a', 'b', 'a', 'c', 'd', 'a']);

            list.removeAll(['a', 'b']);

            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual(['c', 'd']);
        });

        it(`removes items containing in both lists using custom equality comparator`, () => {
            list = new List(['a', 'b', 'a', 'c', 'd', 'a']);

            list.removeAll(['A', 'B']);

            expect(list.length).toBe(6);

            list.removeAll(['A', 'B'], IgnoreCaseComparator.instance);

            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual(['c', 'd']);
        });
    });


    describe(`#forEach()`, () => {
        it(`throws if 'iterator' argument is not defined`, () => {
            expect(() => {
                list.forEach(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`iterates over list`, () => {
            let iterator = jest.fn();

            list = new List(['one', 'two']);

            list.forEach(iterator);

            expect(iterator).toHaveBeenCalledTimes(2);
            expect(iterator.mock.calls[0]).toEqual(['one', 0, list]);
            expect(iterator.mock.calls[1]).toEqual(['two', 1, list]);
        });

        it(`stops iteration if iterator function returns 'false'`, () => {
            let iterator = jest.fn((item: string): boolean | void => {
                if (item === 'one') {
                    return false;
                }
            });

            list = new List(['zero', 'one', 'two']);

            list.forEach(iterator);

            expect(iterator).toHaveBeenCalledTimes(2);
            expect(iterator.mock.calls[1]).toEqual(['one', 1, list]);
        });
    });


    describe(`#aggregate()`, () => {
        it(`throws if 'iterator' function is not defined`, () => {
            expect(() => {
                list.aggregate(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`aggregates list data into new value`, () => {
            let map: object;

            list = new List(['one', 'two', 'three']);

            map = list.aggregate((obj: object, item: string): object => {
                obj[item] = true;

                return obj;
            }, {});

            expect(map).toEqual({
                one: true,
                two: true,
                three: true
            });

            expect(() => {
                map = list.aggregate((obj: object, item: string): object => {
                    obj[item] = true;

                    return undefined;
                }, {});
            }).toThrowError(TypeError);
        });
    });


    describe(`#select()`, () => {
        it(`throws if 'selector' argument is not defined`, () => {
            expect(() => {
                list.select(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of selected values`, () => {
            let firstChars: List<string>;

            list = new List(['one', 'two', 'three']);

            firstChars = list.select((word: string): string => {
                return word[0];
            });

            expect(firstChars).toBeInstanceOf(List);
            expect(firstChars.length).toBe(3);
            expect(firstChars.toArray()).toEqual(['o', 't', 't']);
        });
    });


    describe(`#selectMany()`, () => {
        it(`throws if 'collectionSelector' argument is not defined`, () => {
            expect(() => {
                list.selectMany(null, () => []);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'resultSelector' argument is not defined`, () => {
            expect(() => {
                list.selectMany(() => [], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of selected values`, () => {
            let books: List<{authors: string[]}> = new List([
                {
                    authors: ['Johan Rowling']
                },
                {
                    authors: ['Steve MacConnell', 'Kent Beck']
                }
            ]);

            let authorNames: List<string> = books.selectMany<string, string>((book: {authors: string[]}): string[] => {
                return book.authors;
            }, (book: {authors: string[]}, authorFullName: string): string => {
                return authorFullName.split(' ')[0];
            });

            expect(authorNames.length).toBe(3);

            expect(authorNames.toArray()).toEqual([
                'Johan', 'Steve', 'Kent'
            ]);
        });
    });


    describe(`#where()`, () => {
        it(`throws if 'predicate' function is not defined`, () => {
            expect(() => {
                list.where(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of items for whose predicate function returned 'true'`, () => {
            list = new List(['one', 'two', 'three']);

            let wordsOfThreeChars: List<string> = list.where((word: string): boolean => {
                return word.length === 3;
            });

            expect(wordsOfThreeChars.length).toBe(2);
            expect(wordsOfThreeChars.toArray()).toEqual(['one', 'two']);
        });
    });


    describe(`#all()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.all((): boolean => {
                    return true;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`throws if 'predicate' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.all(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`determines whether all elements of a sequence satisfy a condition`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.all((word: string): boolean => {
                return word.length >= 3;
            })).toEqual(true);

            expect(list.all((word: string): boolean => {
                return word.length < 5;
            })).toEqual(false);
        });
    });


    describe(`#any()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.any((): boolean => {
                    return true;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`throws if 'predicate' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.any(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`determines whether any of elements satisfy a condition`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.any((word: string): boolean => {
                return word.length === 3;
            })).toEqual(true);

            expect(list.any((word: string): boolean => {
                return word.length === 5;
            })).toEqual(true);
        });
    });


    describe(`#average()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.average((): number => {
                    return 0;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`throws if 'selector' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.average(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`calculates average value`, () => {
            list = new List(['one', 'two', 'six']);

            expect(list.average((word: string): number => {
                return word.length;
            })).toEqual(3);
        });
    });


    describe(`#count()`, () => {
        it(`throws if 'predicate' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.count(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`calculates count of items matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.count((word: string): boolean => {
                return word.length > 3;
            })).toEqual(1);
        });
    });


    describe(`#first()`, () => {
        it(`throws if 'predicate' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.first(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns first item matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.first((word: string): boolean => {
                return word.length === 3;
            })).toEqual('one');

            expect(list.first((word: string): boolean => {
                return word.length === 4;
            })).toEqual(null);

            expect(list.first((word: string): boolean => {
                return word.length === 4;
            }, 'fallback')).toEqual('fallback');
        });
    });


    describe(`#firstOrDefault()`, () => {
        it(`returns first item of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.firstOrDefault('fallback')).toEqual('one');
        });

        it(`returns fallback value if list is empty`, () => {
            expect(list.firstOrDefault('fallback')).toEqual('fallback');
        });
    });


    describe(`#last()`, () => {
        it(`throws if 'predicate' function is not defined`, () => {
            list = new List(['one', 'two', 'three']);

            expect(() => {
                list.last(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns last item matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.last((word: string): boolean => {
                return word.length === 3;
            })).toEqual('two');

            expect(list.last((word: string): boolean => {
                return word.length === 4;
            })).toEqual(null);

            expect(list.last((word: string): boolean => {
                return word.length === 4;
            }, 'fallback')).toEqual('fallback');
        });
    });


    describe(`#lastOrDefault()`, () => {
        it(`returns last item of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.lastOrDefault('fallback')).toEqual('three');
        });

        it(`returns fallback value if list is empty`, () => {
            expect(list.lastOrDefault('fallback')).toEqual('fallback');
        });
    });


    describe(`#distinct()`, () => {
        it(`throws if 'comparator' is not defined`, () => {
            expect(() => {
                list.distinct(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of distinct items`, () => {
            let distinctItems: List<string>;

            list = new List(['one', 'two', 'one']);

            distinctItems = list.distinct();

            expect(list).not.toEqual(distinctItems);

            expect(list.length).toEqual(3);
            expect(list.toArray()).toEqual(['one', 'two', 'one']);

            expect(distinctItems.length).toEqual(2);
            expect(distinctItems.toArray()).toEqual(['one', 'two']);
        });
    });


    describe(`#groupBy()`, () => {
        it(`throws if 'keySelector' is not defined`, () => {
            expect(() => {
                list.groupBy(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'keyComparator' is not defined`, () => {
            expect(() => {
                list.groupBy((word: string): number => {
                    return word.length;
                }, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of grouped items using default comparator`, () => {
            list = new List(['one', 'two', 'three']);

            let groupings: List<Grouping<number, string>> = list.groupBy((word: string): number => {
                return word.length;
            });

            expect(groupings.length).toEqual(2);
            expect(groupings[0].key).toBe(3);
            expect(groupings[0].toArray()).toEqual(['one', 'two']);
            expect(groupings[1].key).toBe(5);
            expect(groupings[1].toArray()).toEqual(['three']);
        });

        it(`returns list of grouped items using custom comparator`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            let groupings: List<Grouping<string, string>> = list.groupBy((word: string): string => {
                return word[0].toLowerCase();
            }, IgnoreCaseComparator.instance);

            expect(groupings.length).toEqual(2);
            expect(groupings[0].key).toBe('t');
            expect(groupings[0].toArray()).toEqual(['two', 'Three']);
            expect(groupings[1].key).toBe('o');
            expect(groupings[1].toArray()).toEqual(['ONE', 'one', 'One']);
        });
    });


    describe(`#except()`, () => {
        it(`throws if 'otherList' is not defined`, () => {
            expect(() => {
                list.except(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' is not defined`, () => {
            expect(() => {
                list.except([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list without specified items using default comparator`, () => {
            let filteredList: List<string>;

            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            filteredList = list.except(['Three']);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual(['two', 'ONE', 'one', 'One']);

            filteredList = list.except(['Five']);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual(['two', 'ONE', 'one', 'Three', 'One', 'Five']);
        });

        it(`returns list without specified items using custom comparator`, () => {
            let filteredList: List<string>;

            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            filteredList = list.except(['one', 'Five'], IgnoreCaseComparator.instance);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual(['two', 'Three', 'Five']);
        });
    });


    describe(`#intersect()`, () => {
        it(`throws if 'otherList' is not defined`, () => {
            expect(() => {
                list.intersect(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' is not defined`, () => {
            expect(() => {
                list.intersect([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list without specified items using default comparator`, () => {
            let filteredList: List<string>;

            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            filteredList = list.intersect(['Three', 'Four']);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual(['Three']);

            filteredList = list.intersect(['Five']);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual([]);
        });

        it(`returns list without specified items using custom comparator`, () => {
            let filteredList: List<string>;

            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            filteredList = list.intersect(['one', 'Five'], IgnoreCaseComparator.instance);

            expect(filteredList).not.toBe(list);
            expect(filteredList.toArray()).toEqual(['ONE', 'one', 'One']);
        });
    });


    describe(`#join()`, () => {
        it(`throws if 'outerList' argument is not defined`, () => {
            expect(() => {
                list.join(null, (word: string): string => {
                    return word[0];
                }, (word: string): string => {
                    return word[0];
                }, function (x: string, y: string): string[] {
                    return [x, y];
                });
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'outerKeySelector' argument is not defined`, () => {
            expect(() => {
                list.join([], null, (word: string): string => {
                    return word[0];
                }, function (x: string, y: string): string[] {
                    return [x, y];
                });
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'innerKeySelector' argument is not defined`, () => {
            expect(() => {
                list.join([], (word: string): string => {
                    return word[0];
                }, null, function (x: string, y: string): string[] {
                    return [x, y];
                });
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'resultSelector' argument is not defined`, () => {
            expect(() => {
                list.join([], (word: string): string => {
                    return word[0];
                }, (word: string): string => {
                    return word[0];
                }, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'keyComparator' argument is not defined`, () => {
            expect(() => {
                list.join([], (word: string): string => {
                    return word[0];
                }, (word: string): string => {
                    return word[0];
                }, function (x: string, y: string): string[] {
                    return [x, y];
                }, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`joins lists using custom equality comparator`, () => {
            let joinedList: List<string[]>;

            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            joinedList = list.join(['Ten', 'Once', 'Twelve'], (word: string): string => {
                return word[0];
            }, (word: string): string => {
                return word[0];
            }, function (x: string, y: string): string[] {
                return [x, y];
            }, IgnoreCaseComparator.instance);

            expect(joinedList.toArray()).toEqual([
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


    describe(`#min()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.min((word: string): number => {
                    return word.length;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`throws if 'selector' argument is not defined`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(() => {
                list.min(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns minimal value`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.min((word: string): number => {
                return word.length;
            })).toBe(3);
        });
    });


    describe(`#max()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.max((word: string): number => {
                    return word.length;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`throws if 'selector' argument is not defined`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(() => {
                list.max(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns maximal value`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.max((word: string): number => {
                return word.length;
            })).toBe(5);
        });
    });


    describe(`#orderBy()`, () => {
        it(`throws if 'keySelector' argument is not defined`, () => {
            expect(() => {
                list.orderBy(null, IgnoreCaseComparator.instance);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' argument is not defined`, () => {
            expect(() => {
                list.orderBy((word: string): string => {
                    return word[0];
                }, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'sortOrder' argument is not defined`, () => {
            expect(() => {
                list.orderBy((word: string): string => {
                    return word[0];
                }, IgnoreCaseComparator.instance, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns sorted list using ascending sort order`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.orderBy((word: string): string => {
                return word.slice(0, 2);
            }, IgnoreCaseComparator.instance, SortOrder.Ascending).toArray()).toEqual([
                'ONE', 'one', 'One', 'Three', 'two'
            ]);
        });

        it(`returns sorted list using descending sort order`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.orderBy((word: string): string => {
                return word.slice(0, 2);
            }, IgnoreCaseComparator.instance, SortOrder.Descending).toArray()).toEqual([
                'two', 'Three', 'ONE', 'one', 'One'
            ]);
        });

        it(`returns sorted list using custom no sort order`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.orderBy((word: string): string => {
                return word.slice(0, 2);
            }, IgnoreCaseComparator.instance, SortOrder.None).toArray()).toEqual([
                'two', 'ONE', 'one', 'Three', 'One'
            ]);
        });
    });


    describe(`#reverse()`, () => {
        it(`returns reversed list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.reverse().toArray()).toEqual(['three', 'two', 'one']);
        });
    });


    describe(`#equals()`, () => {
        it(`throws if 'otherList' argument is not defined`, () => {
            expect(() => {
                list.equals(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' argument is not defined`, () => {
            expect(() => {
                list.equals([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`compares empty lists`, () => {
            expect(list.equals([])).toBe(true);
        });

        it(`compares lists using default equality comparator`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.equals(['one', 'two', 'three'])).toBe(true);
            expect(list.equals(['ONE', 'TWO'])).toBe(false);
            expect(list.equals(['ONE', 'TWO', 'THREE'])).toBe(false);
        });

        it(`compares lists using custom equality comparator`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.equals(['one', 'two', 'three'], IgnoreCaseComparator.instance)).toBe(true);
            expect(list.equals(['ONE', 'TWO'], IgnoreCaseComparator.instance)).toBe(false);
            expect(list.equals(['ONE', 'TWO', 'THREE'], IgnoreCaseComparator.instance)).toBe(true);
        });
    });


    describe(`#skip()`, () => {
        it(`throws if 'offset' argument is not defined`, () => {
            expect(() => {
                list.skip(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if offset is out of bounds`, () => {
            expect(() => {
                list.skip(0);
            }).not.toThrowError(RangeException);

            expect(() => {
                list.skip(1);
            }).toThrowError(RangeException);

            expect(() => {
                list.skip(-10);
            }).toThrowError(RangeException);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.skip(1).toArray()).toEqual(['two', 'three']);
        });
    });


    describe(`#skipWhile()`, () => {
        it(`throws if 'predicate' argument is not defined`, () => {
            expect(() => {
                list.skipWhile(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`works with empty lists`, () => {
            expect(list.skipWhile((word: string): boolean => {
                return word[0] !== 't';
            }).toArray()).toEqual([]);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.skipWhile((word: string): boolean => {
                return word[0] !== 't';
            }).toArray()).toEqual(['two', 'three']);
        });
    });


    describe(`#take()`, () => {
        it(`throws if 'length' argument is not defined`, () => {
            expect(() => {
                list.take(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if length is out of bounds`, () => {
            expect(() => {
                list.take(0);
            }).not.toThrowError(RangeException);

            expect(() => {
                list.take(1);
            }).toThrowError(RangeException);

            expect(() => {
                list.take(-10);
            }).toThrowError(RangeException);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.take(2).toArray()).toEqual(['one', 'two']);
        });
    });


    describe(`#takeWhile()`, () => {
        it(`throws if 'predicate' argument is not defined`, () => {
            expect(() => {
                list.takeWhile(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`works with empty lists`, () => {
            expect(list.takeWhile((word: string): boolean => {
                return word[0] !== 't';
            }).toArray()).toEqual([]);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.takeWhile((word: string): boolean => {
                return word[0] !== 't';
            }).toArray()).toEqual(['one']);
        });
    });


    describe(`#slice()`, () => {
        it(`throws if 'offset' argument is not defined`, () => {
            expect(() => {
                list.slice(null, 1);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'length' argument is not defined`, () => {
            expect(() => {
                list.slice(0, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if slice range is invalid`, () => {
            expect(() => {
                list.slice(0, 1);
            }).toThrowError(RangeException);

            expect(() => {
                list.slice(-1, 0);
            }).toThrowError(RangeException);
        });

        it(`works with empty lists`, () => {
            expect(list.slice(0, 0).toArray()).toEqual([]);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.slice(1, 1).toArray()).toEqual(['two']);
            expect(list.slice(2, 1).toArray()).toEqual(['three']);
            expect(list.slice(1, 2).toArray()).toEqual(['two', 'three']);
        });
    });


    describe(`#concat()`, () => {
        it(`throws if 'otherList' argument is not defined`, () => {
            expect(() => {
                list.concat(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns concatenation of lists`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.concat(['four', 'five']).toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
            expect(list.length).toEqual(3);
        });
    });


    describe(`#union()`, () => {
        it(`throws if 'otherList' argument is not defined`, () => {
            expect(() => {
                list.union(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' argument is not defined`, () => {
            expect(() => {
                list.union([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns union of lists`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.union([
                'four', 'one', 'two', 'three', 'five'
            ]).toArray()).toEqual([
                'one', 'two', 'three', 'four', 'five'
            ]);
            expect(list.length).toEqual(3);
        });
    });


    describe(`#zip()`, () => {
        it(`throws if 'otherList' argument is not defined`, () => {
            expect(() => {
                list.zip(null, (x: string, y: string): string => {
                    return `${x}+${y}`;
                });
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'resultSelector' argument is not defined`, () => {
            expect(() => {
                list.zip([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns list of combined items`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.zip([
                'four', 'five'
            ], (x: string, y: string): string => {
                return `${x}+${y}`;
            }).toArray()).toEqual([
                'one+four', 'two+five'
            ]);

            expect(list.zip([
                'four', 'five', 'six', 'seven'
            ], (x: string, y: string): string => {
                return `${x}+${y}`;
            }).toArray()).toEqual([
                'one+four', 'two+five', 'three+six'
            ]);
        });
    });
});
