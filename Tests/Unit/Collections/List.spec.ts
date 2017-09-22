import {List} from '../../../Source/Collections/List';
import {InvalidOperationException} from '../../../Source/Exceptions/InvalidOperationException';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {Grouping} from '../../../Source/Collections/Grouping';
import {SortOrder} from '../../../Source/Collections/SortOrder';
import {RangeException} from '../../../Source/Exceptions/RangeException';
import {ArgumentIndexOutOfBoundsException} from '../../../Source/Exceptions/ArgumentIndexOutOfBoundsException';
import {ArgumentRangeException} from '../../../Source/Exceptions/ArgumentRangeException';
import {IPropertyAccess} from '../../../Source/Core/Abstraction/IPropertyAccess';


describe('List', () => {
    let list: List<string>;


    beforeEach(() => {
        list = new List<string>();
    });


    describe('insert()', () => {
        it(`throws if index out of bounds`, () => {
            expect(() => {
                list.insert(-1, 'one');
            }).toThrowError(ArgumentIndexOutOfBoundsException);

            expect(() => {
                list.insert(1, 'one');
            }).toThrowError(ArgumentIndexOutOfBoundsException);
        });

        it('insert item into list', () => {
            expect(list.length).toEqual(0);

            list.insert(0, 'one');

            expect(list.length).toEqual(1);
            expect(list.toArray()).toEqual(['one']);

            list.insert(1, 'two');

            expect(list.length).toEqual(2);
            expect(list.toArray()).toEqual(['one', 'two']);

            list.insert(0, 'three');

            expect(list.length).toEqual(3);
            expect(list.toArray()).toEqual(['three', 'one', 'two']);
        });
    });


    describe(`insertAll()`, () => {
        it(`throws if 'index' is out of bounds`, () => {
            expect(() => {
                list.insertAll(1, ['one', 'two']);
            }).toThrowError(ArgumentIndexOutOfBoundsException);

            expect(() => {
                list.insertAll(-1, ['one', 'two']);
            }).toThrowError(ArgumentIndexOutOfBoundsException);
        });

        it(`inserts items at specified position`, () => {
            list = new List(['one', 'four']);

            list.insertAll(1, ['two', 'three']);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
        });
    });


    describe('removeAt()', () => {
        it(`throws if 'index' argument is out of bounds`, () => {
            expect(() => {
                list.removeAt(-1);
            }).toThrowError(ArgumentIndexOutOfBoundsException);

            expect(() => {
                list.removeAt(4);
            }).toThrowError(ArgumentIndexOutOfBoundsException);
        });

        it('removes item with specified index from list', () => {
            list = new List(['one', 'two']);

            expect(list.removeAt(1)).toBe('two');

            expect(list.length).toEqual(1);
            expect(list.toArray()).toEqual(['one']);

            expect(list.removeAt(0)).toBe('one');

            expect(list.length).toEqual(0);
        });
    });


    describe('indexOf()', () => {
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
            }).toThrowError(ArgumentIndexOutOfBoundsException);
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
            }).toThrowError(ArgumentRangeException);

            expect(() => {
                list.indexOf('one', 0, 5);
            }).toThrowError(RangeException);
        });

        it(`finds index of given item using custom equality comparator`, () => {
            list = new List(['one', 'two']);

            expect(list.indexOf('ONE')).toBe(-1);
            expect(list.indexOf('ONE', 0, list.length, IgnoreCaseComparator.instance)).toBe(0);
            expect(list.indexOf('ONE', 1, list.length - 1, IgnoreCaseComparator.instance)).toBe(-1);
            expect(list.indexOf('THREE', 0, list.length, IgnoreCaseComparator.instance)).toBe(-1);
        });
    });


    describe('lastIndexOf()', () => {
        it(`does not throws if 'startIndex' argument is not defined`, () => {
            expect(() => {
                list.lastIndexOf('one');
            }).not.toThrow();
        });

        it(`does not throws if 'startIndex' argument is 0 and list length is 0'`, () => {
            expect(() => {
                list.lastIndexOf('one', 0);
            }).not.toThrow();
        });

        it(`throws if 'startIndex' is out of bounds`, () => {
            expect(() => {
                list.lastIndexOf('one', 1);
            }).toThrowError(ArgumentIndexOutOfBoundsException);
        });

        it(`throws if search range is out of bounds`, () => {
            list = new List(['one', 'two', 'three', 'four']);

            expect(() => {
                list.lastIndexOf('one', 0, -1);
            }).toThrowError(ArgumentRangeException);

            expect(() => {
                list.lastIndexOf('one', 0, 1);
            }).not.toThrowError(RangeException);

            expect(() => {
                list.lastIndexOf('one', 0, 5);
            }).toThrowError(RangeException);
        });

        it('finds index of given item', () => {
            list = new List(['one', 'two', 'one', 'two', 'three', 'four']);

            expect(list.lastIndexOf('four')).toEqual(5);
            expect(list.lastIndexOf('three')).toEqual(4);
            expect(list.lastIndexOf('two')).toEqual(3);
            expect(list.lastIndexOf('one')).toEqual(2);
            expect(list.lastIndexOf('five')).toEqual(-1);
        });

        it(`finds index of given item starting with specified index`, () => {
            list = new List(['one', 'two', 'one', 'two', 'three', 'four']);

            expect(list.lastIndexOf('one', 0)).toEqual(0);
            expect(list.lastIndexOf('one', 1)).toEqual(0);
            expect(list.lastIndexOf('one', 2)).toEqual(2);
            expect(list.lastIndexOf('two', 2)).toEqual(1);
            expect(list.lastIndexOf('two', 3)).toEqual(3);
            expect(list.lastIndexOf('two', 4)).toEqual(3);
            expect(list.lastIndexOf('three', 1)).toEqual(-1);
            expect(list.lastIndexOf('three', 4)).toEqual(4);
            expect(list.lastIndexOf('three', 5)).toEqual(4);
            expect(list.lastIndexOf('four', 4)).toEqual(-1);
            expect(list.lastIndexOf('four', 5)).toEqual(5);
        });

        it(`finds index of given item in specified range`, () => {
            list = new List(['one', 'two', 'three', 'four']);

            expect(list.lastIndexOf('one', 3, 2)).toBe(-1);
            expect(list.lastIndexOf('one', 3, 4)).toBe(0);
        });

        it(`finds index of given item using custom equality comparator`, () => {
            list = new List(['one', 'two']);

            expect(list.lastIndexOf('ONE')).toBe(-1);
            expect(list.lastIndexOf('ONE', 0, 1, IgnoreCaseComparator.instance)).toBe(0);
            expect(list.lastIndexOf('ONE', 1, 1, IgnoreCaseComparator.instance)).toBe(-1);
            expect(list.lastIndexOf('THREE', 0, 1, IgnoreCaseComparator.instance)).toBe(-1);
        });
    });


    describe(`forEach()`, () => {
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


    describe(`aggregate()`, () => {
        it(`aggregates list data into new value`, () => {
            let map: object;

            list = new List(['one', 'two', 'three']);

            map = list.aggregate((obj: IPropertyAccess<boolean>, item: string): object => {
                obj[item] = true;

                return obj;
            }, {}) as object;

            expect(map).toEqual({
                one: true,
                two: true,
                three: true
            });

            expect(() => {
                map = list.aggregate((obj: IPropertyAccess<boolean>, item: string): object | undefined => {
                    obj[item] = true;

                    return undefined;
                }, {}) as object;
            }).toThrowError(TypeError);
        });
    });


    describe(`select()`, () => {
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


    describe(`selectMany()`, () => {
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


    describe(`where()`, () => {
        it(`returns list of items for whose predicate function returned 'true'`, () => {
            list = new List(['one', 'two', 'three']);

            let wordsOfThreeChars: List<string> = list.where((word: string): boolean => {
                return word.length === 3;
            });

            expect(wordsOfThreeChars.length).toBe(2);
            expect(wordsOfThreeChars.toArray()).toEqual(['one', 'two']);
        });
    });


    describe(`all()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.all((): boolean => {
                    return true;
                });
            }).toThrowError(InvalidOperationException);
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


    describe(`any()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.any((): boolean => {
                    return true;
                });
            }).toThrowError(InvalidOperationException);
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


    describe(`average()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.average((): number => {
                    return 0;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`calculates average value`, () => {
            list = new List(['one', 'two', 'six']);

            expect(list.average((word: string): number => {
                return word.length;
            })).toEqual(3);
        });
    });


    describe(`count()`, () => {
        it(`calculates count of items matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.count((word: string): boolean => {
                return word.length > 3;
            })).toEqual(1);
        });
    });


    describe(`first()`, () => {
        it(`returns first item matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.first((word: string): boolean => {
                return word.length === 3;
            })).toEqual('one');

            expect(list.first((word: string): boolean => {
                return word.length === 4;
            })).toEqual(undefined);

            expect(list.first((word: string): boolean => {
                return word.length === 4;
            }, 'fallback')).toEqual('fallback');
        });
    });


    describe(`firstOrDefault()`, () => {
        it(`returns first item of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.firstOrDefault('fallback')).toEqual('one');
        });

        it(`returns fallback value if list is empty`, () => {
            expect(list.firstOrDefault('fallback')).toEqual('fallback');
        });
    });


    describe(`last()`, () => {
        it(`returns last item matching predicate`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.last((word: string): boolean => {
                return word.length === 3;
            })).toEqual('two');

            expect(list.last((word: string): boolean => {
                return word.length === 4;
            })).toBeUndefined();

            expect(list.last((word: string): boolean => {
                return word.length === 4;
            }, 'fallback')).toEqual('fallback');
        });
    });


    describe(`lastOrDefault()`, () => {
        it(`returns last item of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.lastOrDefault('fallback')).toEqual('three');
        });

        it(`returns fallback value if list is empty`, () => {
            expect(list.lastOrDefault('fallback')).toEqual('fallback');
        });
    });


    describe(`distinct()`, () => {
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


    describe(`groupBy()`, () => {
        it(`returns list of grouped items using default comparator`, () => {
            list = new List(['one', 'two', 'three']);

            let groupings: List<Grouping<number, string>> = list.groupBy((word: string): number => {
                return word.length;
            });

            expect(groupings.length).toEqual(2);
            expect((groupings[0] as Grouping<number, string>).key).toBe(3);
            expect((groupings[0] as Grouping<number, string>).toArray()).toEqual(['one', 'two']);
            expect((groupings[1] as Grouping<number, string>).key).toBe(5);
            expect((groupings[1] as Grouping<number, string>).toArray()).toEqual(['three']);
        });

        it(`returns list of grouped items using custom comparator`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            let groupings: List<Grouping<string, string>> = list.groupBy((word: string): string => {
                return word[0].toLowerCase();
            }, IgnoreCaseComparator.instance);

            expect(groupings.length).toEqual(2);
            expect((groupings[0] as Grouping<string, string>).key).toBe('t');
            expect((groupings[0] as Grouping<string, string>).toArray()).toEqual(['two', 'Three']);
            expect((groupings[1] as Grouping<string, string>).key).toBe('o');
            expect((groupings[1] as Grouping<string, string>).toArray()).toEqual(['ONE', 'one', 'One']);
        });
    });


    describe(`except()`, () => {
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


    describe(`intersect()`, () => {
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


    describe(`join()`, () => {
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


    describe(`min()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.min((word: string): number => {
                    return word.length;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`returns minimal value`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.min((word: string): number => {
                return word.length;
            })).toBe(3);
        });
    });


    describe(`max()`, () => {
        it(`throws if list is empty`, () => {
            expect(() => {
                list.max((word: string): number => {
                    return word.length;
                });
            }).toThrowError(InvalidOperationException);
        });

        it(`returns maximal value`, () => {
            list = new List(['two', 'ONE', 'one', 'Three', 'One']);

            expect(list.max((word: string): number => {
                return word.length;
            })).toBe(5);
        });
    });


    describe(`orderBy()`, () => {
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


    describe(`reverse()`, () => {
        it(`returns reversed list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.reverse().toArray()).toEqual(['three', 'two', 'one']);
        });
    });


    describe(`equals()`, () => {
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


    describe(`skip()`, () => {
        it(`throws if offset is out of bounds`, () => {
            expect(() => {
                list.skip(0);
            }).not.toThrowError(ArgumentIndexOutOfBoundsException);

            expect(() => {
                list.skip(1);
            }).toThrowError(ArgumentIndexOutOfBoundsException);

            expect(() => {
                list.skip(-10);
            }).toThrowError(ArgumentIndexOutOfBoundsException);
        });

        it(`returns slice of list`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.skip(1).toArray()).toEqual(['two', 'three']);
        });
    });


    describe(`skipWhile()`, () => {
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


    describe(`take()`, () => {
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


    describe(`takeWhile()`, () => {
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


    describe(`slice()`, () => {
        it(`throws if slice range is invalid`, () => {
            expect(() => list.slice(0, 1)).toThrowError(RangeException);
            expect(() => list.slice(-1, 0)).toThrowError(ArgumentIndexOutOfBoundsException);
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


    describe(`concat()`, () => {
        it(`returns concatenation of lists`, () => {
            list = new List(['one', 'two', 'three']);

            expect(list.concat(['four', 'five']).toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
            expect(list.length).toEqual(3);
        });
    });


    describe(`union()`, () => {
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


    describe(`zip()`, () => {
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
