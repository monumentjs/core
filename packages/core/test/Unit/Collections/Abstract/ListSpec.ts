import {InvalidOperationException} from '../../../../main/exceptions/InvalidOperationException';
import {IgnoreCaseComparator} from '../../../../../text/main/IgnoreCaseComparator';
import {SortOrder} from '../../../../../collections/main/SortOrder';
import {RangeException} from '../../../../main/RangeException';
import {ArgumentIndexOutOfBoundsException} from '../../../../main/exceptions/ArgumentIndexOutOfBoundsException';
import {List} from '../../../../../collections/main/List';
import {NamedPool} from '../../../../main/NamedPool';
import {Grouping} from '../../../../../collections/main/Grouping';
import {InvalidArgumentException} from '../../../../main/exceptions/InvalidArgumentException';
import {ArgumentRangeException} from '../../../../main/exceptions/ArgumentRangeException';
import {CollectionSpec} from './CollectionSpec';
import {Case} from '../../../../../test-drive/decorator/Case';


interface Book {
    authors: List<string>;
}


export abstract class ListSpec extends CollectionSpec {

    public abstract create<T>(items?: Iterable<T>): List<T>;


    @Case()
    public 'insert() throws if index out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.insert(-1, 'one');
        }).toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            list.insert(1, 'one');
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'insert() inserts item into list'() {
        let list: List<string> = this.create();

        list.insert(0, 'one');

        expect(list.length).toEqual(1);
        expect(list.toArray()).toEqual(['one']);

        list.insert(1, 'two');

        expect(list.length).toEqual(2);
        expect(list.toArray()).toEqual(['one', 'two']);

        list.insert(0, 'three');

        expect(list.length).toEqual(3);
        expect(list.toArray()).toEqual(['three', 'one', 'two']);
    }


    @Case()
    public 'insertAll() throws if `index` is out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.insertAll(1, ['one', 'two']);
        }).toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            list.insertAll(-1, ['one', 'two']);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'insertAll() inserts items at specified position'() {
        let list: List<string> = this.create(['one', 'four']);

        list.insertAll(1, ['two', 'three']);

        expect(list.length).toBe(4);
        expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);
    }


    @Case()
    public 'removeAt() throws if `index` argument is out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.removeAt(-1);
        }).toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            list.removeAt(4);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'removeAt() removes item with specified index from list'() {
        let list: List<string> = this.create(['one', 'two']);

        expect(list.removeAt(1)).toBe('two');

        expect(list.length).toEqual(1);
        expect(list.toArray()).toEqual(['one']);

        expect(list.removeAt(0)).toBe('one');

        expect(list.length).toEqual(0);

    }


    @Case()
    public 'indexOf() does not throws if `startIndex` argument is undefined'() {
        let list: List<string> = this.create();

        expect(() => {
            list.indexOf('one');
        }).not.toThrow();
    }


    @Case()
    public 'indexOf() does not throws if `startIndex` argument is 0 and list length is 0'() {
        let list: List<string> = this.create();

        expect(() => {
            list.indexOf('one', 0);
        }).not.toThrow();
    }


    @Case()
    public 'indexOf() finds index of given item starting from first element'() {
        let list: List<string> = this.create(['one', 'two']);

        expect(list.indexOf('one')).toEqual(0);
        expect(list.indexOf('two')).toEqual(1);
        expect(list.indexOf('three')).toEqual(-1);
    }


    @Case()
    public 'indexOf() throws if `startIndex` is out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.indexOf('one', 1);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'indexOf() finds index of given item starting from specified index'() {
        let list: List<string> = this.create(['one', 'two']);

        expect(list.indexOf('one', 1)).toEqual(-1);
        expect(list.indexOf('two', 1)).toEqual(1);
    }


    @Case()
    public 'indexOf() finds index of given item in specified range'() {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        expect(list.indexOf('four', 0, 2)).toBe(-1);
        expect(list.indexOf('four', 0, 4)).toBe(3);
    }


    @Case()
    public 'indexOf() throws if search range is out of bounds'() {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        expect(() => {
            list.indexOf('one', 0, -1);
        }).toThrowError(InvalidArgumentException);

        expect(() => {
            list.indexOf('one', 0, 5);
        }).toThrowError(RangeException);
    }


    @Case()
    public 'indexOf() finds index of given item using custom equality comparator'() {
        let list: List<string> = this.create(['one', 'two']);

        expect(list.indexOf('ONE')).toBe(-1);
        expect(list.indexOf('ONE', 0, list.length, IgnoreCaseComparator.instance)).toBe(0);
        expect(list.indexOf('ONE', 1, list.length - 1, IgnoreCaseComparator.instance)).toBe(-1);
        expect(list.indexOf('THREE', 0, list.length, IgnoreCaseComparator.instance)).toBe(-1);
    }


    @Case()
    public 'lastIndexOf() does not throws if `startIndex` argument is not defined'() {
        let list: List<string> = this.create();

        expect(() => {
            list.lastIndexOf('one');
        }).not.toThrow();
    }


    @Case()
    public 'lastIndexOf() does not throws if `startIndex` argument is 0 and list length is 0'() {
        let list: List<string> = this.create();

        expect(() => {
            list.lastIndexOf('one', 0);
        }).not.toThrow();
    }


    @Case()
    public 'lastIndexOf() throws if `startIndex` is out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.lastIndexOf('one', 1);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'lastIndexOf() throws if search range length specified as negative number'() {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        expect(() => {
            list.lastIndexOf('one', 0, -1);
        }).toThrowError(InvalidArgumentException);
    }


    @Case()
    public 'lastIndexOf() does not throw RangeException if search range length specified as negative number'() {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        expect(() => {
            list.lastIndexOf('one', 0, 1);
        }).not.toThrow();

        expect(() => {
            list.lastIndexOf('one', 0, 5);
        }).toThrowError(ArgumentRangeException);
    }


    @Case()
    public 'lastIndexOf() finds index of given item'() {
        let list: List<string> = this.create(['one', 'two', 'one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('four')).toEqual(5);
        expect(list.lastIndexOf('three')).toEqual(4);
        expect(list.lastIndexOf('two')).toEqual(3);
        expect(list.lastIndexOf('one')).toEqual(2);
        expect(list.lastIndexOf('five')).toEqual(-1);
    }


    @Case()
    public 'lastIndexOf() finds index of given item starting with specified index'() {
        let list: List<string> = this.create(['one', 'two', 'one', 'two', 'three', 'four']);

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
    }


    @Case()
    public 'lastIndexOf() finds index of given item in specified range'() {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        expect(list.lastIndexOf('one', 3, 2)).toBe(-1);
        expect(list.lastIndexOf('one', 3, 4)).toBe(0);
    }


    @Case()
    public 'lastIndexOf() finds index of given item using custom equality comparator'() {
        let list: List<string> = this.create(['one', 'two']);

        expect(list.lastIndexOf('ONE')).toBe(-1);
        expect(list.lastIndexOf('ONE', 0, 1, IgnoreCaseComparator.instance)).toBe(0);
        expect(list.lastIndexOf('ONE', 1, 1, IgnoreCaseComparator.instance)).toBe(-1);
        expect(list.lastIndexOf('THREE', 0, 1, IgnoreCaseComparator.instance)).toBe(-1);
    }


    @Case()
    public 'forEach() iterates over list'() {
        let iterator = jest.fn();

        let list: List<string> = this.create(['one', 'two']);

        list.forEach(iterator);

        expect(iterator).toHaveBeenCalledTimes(2);
    }


    @Case()
    public 'aggregate() aggregates list data into new value'() {
        let map: NamedPool<boolean>;

        let list: List<string> = this.create(['one', 'two', 'three']);

        map = list.aggregate((obj: NamedPool<boolean>, item: string): NamedPool<boolean> => {
            obj[item] = true;

            return obj;
        }, {});

        expect(map).toEqual({
            one: true,
            two: true,
            three: true
        });
    }


    @Case()
    public 'select() returns list of selected values'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let firstChars: List<string> = list.select((word: string): string => {
            return word[0];
        });

        expect(firstChars.length).toBe(3);
        expect(firstChars.toArray()).toEqual(['o', 't', 't']);
    }


    @Case()
    public 'selectMany() returns list of selected values'() {
        let books: List<Book> = this.create([
            {
                authors: this.create([
                    'Johan Rowling'
                ])
            },
            {
                authors: this.create([
                    'Steve MacConnell',
                    'Kent Beck'
                ])
            }
        ]);

        let authorNames: List<string> = books.selectMany<string, string>((book: Book): List<string> => {
            return book.authors;
        }, (book: Book, authorFullName: string): string => {
            return authorFullName.split(' ')[0];
        });

        expect(authorNames.length).toBe(3);

        expect(authorNames.toArray()).toEqual([
            'Johan', 'Steve', 'Kent'
        ]);
    }


    @Case()
    public 'where() returns list of items for whose predicate function returned `true`'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let wordsOfThreeChars: List<string> = list.where((word: string): boolean => {
            return word.length === 3;
        });

        expect(wordsOfThreeChars.length).toBe(2);
        expect(wordsOfThreeChars.toArray()).toEqual(['one', 'two']);
    }


    @Case()
    public 'all() throws if list is empty'() {
        let list: List<string> = this.create();

        expect(() => {
            list.all((): boolean => {
                return true;
            });
        }).toThrowError(InvalidOperationException);
    }


    @Case()
    public 'all() determines whether all elements of a sequence satisfy a condition'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.all((word: string): boolean => {
            return word.length >= 3;
        })).toEqual(true);

        expect(list.all((word: string): boolean => {
            return word.length < 5;
        })).toEqual(false);
    }


    @Case()
    public 'any() throws if list is empty'() {
        let list: List<string> = this.create();

        expect(() => {
            list.any((): boolean => {
                return true;
            });
        }).toThrowError(InvalidOperationException);
    }


    @Case()
    public 'any()  determines whether any of elements satisfy a condition'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.any((word: string): boolean => {
            return word.length === 3;
        })).toEqual(true);

        expect(list.any((word: string): boolean => {
            return word.length === 5;
        })).toEqual(true);
    }


    @Case()
    public 'average() throws if list is empty'() {
        let list: List<string> = this.create();

        expect(() => {
            list.average((): number => {
                return 0;
            });
        }).toThrowError(InvalidOperationException);
    }


    @Case()
    public 'average() calculates average value'() {
        let list: List<string> = this.create(['one', 'two', 'six']);

        expect(list.average((word: string): number => {
            return word.length;
        })).toEqual(3);
    }


    @Case()
    public 'count() calculates count of items matching predicate'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.count((word: string): boolean => {
            return word.length > 3;
        })).toEqual(1);
    }


    @Case()
    public 'first() returns first item matching predicate'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.first((word: string): boolean => {
            return word.length === 3;
        })).toEqual('one');

        expect(list.first((word: string): boolean => {
            return word.length === 4;
        })).toEqual(undefined);

        expect(list.first((word: string): boolean => {
            return word.length === 4;
        }, 'fallback')).toEqual('fallback');
    }


    @Case()
    public 'firstOrDefault() returns first item of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.firstOrDefault('fallback')).toEqual('one');
    }


    @Case()
    public 'firstOrDefault() returns fallback value if list is empty'() {
        let list: List<string> = this.create();

        expect(list.firstOrDefault('fallback')).toEqual('fallback');
    }


    @Case()
    public 'last() returns last item matching predicate'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.last((word: string): boolean => {
            return word.length === 3;
        })).toEqual('two');

        expect(list.last((word: string): boolean => {
            return word.length === 4;
        })).toBeUndefined();

        expect(list.last((word: string): boolean => {
            return word.length === 4;
        }, 'fallback')).toEqual('fallback');
    }


    @Case()
    public 'lastOrDefault() returns last item of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.lastOrDefault('fallback')).toEqual('three');
    }


    @Case()
    public 'lastOrDefault() returns fallback value if list is empty'() {
        let list: List<string> = this.create();

        expect(list.lastOrDefault('fallback')).toEqual('fallback');
    }


    @Case()
    public 'distinct() returns list of distinct items'() {
        let distinctItems: List<string>;

        let list: List<string> = this.create(['one', 'two', 'one']);

        distinctItems = list.distinct();

        expect(list).not.toEqual(distinctItems);

        expect(list.length).toEqual(3);
        expect(list.toArray()).toEqual(['one', 'two', 'one']);

        expect(distinctItems.length).toEqual(2);
        expect(distinctItems.toArray()).toEqual(['one', 'two']);
    }


    @Case()
    public 'groupBy() returns list of grouped items using default comparator'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let groups: List<Grouping<number, string>> = list.groupBy((word: string): number => {
            return word.length;
        });

        expect(groups.length).toEqual(2);
        expect(groups.getAt(0).key).toBe(3);
        expect(groups.getAt(0).toArray()).toEqual(['one', 'two']);
        expect(groups.getAt(1).key).toBe(5);
        expect(groups.getAt(1).toArray()).toEqual(['three']);
    }


    @Case()
    public 'groupBy() returns list of grouped items using custom comparator'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        let groups: List<Grouping<string, string>> = list.groupBy((word: string): string => {
            return word[0].toLowerCase();
        }, IgnoreCaseComparator.instance);

        expect(groups.length).toEqual(2);
        expect(groups.getAt(0).key).toBe('t');
        expect(groups.getAt(0).toArray()).toEqual(['two', 'Three']);
        expect(groups.getAt(1).key).toBe('o');
        expect(groups.getAt(1).toArray()).toEqual(['ONE', 'one', 'One']);
    }


    @Case()
    public 'except() returns list without specified items using default comparator'() {
        let filteredList: List<string>;

        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        filteredList = list.except(this.create(['Three']));

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual(['two', 'ONE', 'one', 'One']);

        filteredList = list.except(this.create(['Five']));

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual(['two', 'ONE', 'one', 'Three', 'One', 'Five']);
    }


    @Case()
    public 'except() returns list without specified items using custom comparator'() {
        let filteredList: List<string>;

        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        filteredList = list.except(this.create(['one', 'Five']), IgnoreCaseComparator.instance);

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual(['two', 'Three', 'Five']);
    }


    @Case()
    public 'intersect() returns list without specified items using default comparator'() {
        let filteredList: List<string>;

        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        filteredList = list.intersect(this.create(['Three', 'Four']));

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual(['Three']);

        filteredList = list.intersect(this.create(['Five']));

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual([]);
    }


    @Case()
    public 'intersect() returns list without specified items using custom comparator'() {
        let filteredList: List<string>;

        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        filteredList = list.intersect(this.create(['one', 'Five']), IgnoreCaseComparator.instance);

        expect(filteredList).not.toBe(list);
        expect(filteredList.toArray()).toEqual(['ONE', 'one', 'One']);
    }


    @Case()
    public 'join() joins lists using custom equality comparator'() {

        let joinedList: List<string[]>;

        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        joinedList = list.join(this.create(['Ten', 'Once', 'Twelve']), (word: string): string => {
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
    }


    @Case()
    public 'min() throws if list is empty'() {
        let list: List<string> = this.create();

        expect(() => {
            list.min((word: string): number => {
                return word.length;
            });
        }).toThrowError(InvalidOperationException);
    }


    @Case()
    public 'min() returns minimal value'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        expect(list.min((word: string): number => {
            return word.length;
        })).toBe(3);
    }


    @Case()
    public 'max() throws if list is empty'() {

        let list: List<string> = this.create();

        expect(() => {
            list.max((word: string): number => {
                return word.length;
            });
        }).toThrowError(InvalidOperationException);
    }


    @Case()
    public 'max() returns maximal value'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        expect(list.max((word: string): number => {
            return word.length;
        })).toBe(5);
    }


    @Case()
    public 'orderBy() returns sorted list using ascending sort order'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        expect(list.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, IgnoreCaseComparator.instance, SortOrder.Ascending).toArray()).toEqual([
            'ONE', 'one', 'One', 'Three', 'two'
        ]);
    }


    @Case()
    public 'orderBy() returns sorted list using descending sort order'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        expect(list.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, IgnoreCaseComparator.instance, SortOrder.Descending).toArray()).toEqual([
            'two', 'Three', 'ONE', 'one', 'One'
        ]);
    }


    @Case()
    public 'orderBy() returns sorted list using custom no sort order'() {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        expect(list.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, IgnoreCaseComparator.instance, SortOrder.None).toArray()).toEqual([
            'two', 'ONE', 'one', 'Three', 'One'
        ]);
    }


    @Case()
    public 'reverse() returns reversed list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.reverse().toArray()).toEqual(['three', 'two', 'one']);
    }


    @Case()
    public 'skip() throws if offset is out of bounds'() {

        let list: List<string> = this.create();

        expect(() => {
            list.skip(0);
        }).not.toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            list.skip(1);
        }).toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            list.skip(-10);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'skip() returns slice of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.skip(1).toArray()).toEqual(['two', 'three']);
    }


    @Case()
    public 'skipWhile() works with empty lists'() {
        let list: List<string> = this.create();

        expect(list.skipWhile((word: string): boolean => {
            return word[0] !== 't';
        }).toArray()).toEqual([]);
    }


    @Case()
    public 'skipWhile() returns slice of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.skipWhile((word: string): boolean => {
            return word[0] !== 't';
        }).toArray()).toEqual(['two', 'three']);
    }


    @Case()
    public 'take() throws if length is out of bounds'() {
        let list: List<string> = this.create();

        expect(() => {
            list.take(0);
        }).not.toThrowError(RangeException);

        expect(() => {
            list.take(1);
        }).toThrowError(RangeException);

        expect(() => {
            list.take(-10);
        }).toThrowError(RangeException);
    }


    @Case()
    public 'take() returns slice of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.take(2).toArray()).toEqual(['one', 'two']);
    }


    @Case()
    public 'takeWhile() works with empty lists'() {

        let list: List<string> = this.create();

        expect(list.takeWhile((word: string): boolean => {
            return word[0] !== 't';
        }).toArray()).toEqual([]);
    }


    @Case()
    public 'takeWhile() returns slice of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.takeWhile((word: string): boolean => {
            return word[0] !== 't';
        }).toArray()).toEqual(['one']);
    }


    @Case()
    public 'slice() throws if slice range is invalid'() {
        let list: List<string> = this.create();

        expect(() => list.slice(0, 1)).toThrowError(RangeException);
        expect(() => list.slice(-1, 0)).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'slice() works with empty lists'() {
        let list: List<string> = this.create();

        expect(list.slice(0, 0).toArray()).toEqual([]);
    }


    @Case()
    public 'slice() returns slice of list'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.slice(1, 1).toArray()).toEqual(['two']);
        expect(list.slice(2, 1).toArray()).toEqual(['three']);
        expect(list.slice(1, 2).toArray()).toEqual(['two', 'three']);
    }


    @Case()
    public 'concat() returns concatenation of lists'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.concat(this.create(['four', 'five'])).toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
        expect(list.length).toEqual(3);
    }


    @Case()
    public 'union() returns union of lists'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.union(this.create([
            'four', 'one', 'two', 'three', 'five'
        ])).toArray()).toEqual([
            'one', 'two', 'three', 'four', 'five'
        ]);
        expect(list.length).toEqual(3);
    }


    @Case()
    public 'zip() returns list of combined items'() {
        let list: List<string> = this.create(['one', 'two', 'three']);

        expect(list.zip(this.create([
            'four', 'five'
        ]), (x: string, y: string): string => {
            return `${x}+${y}`;
        }).toArray()).toEqual([
            'one+four', 'two+five'
        ]);

        expect(list.zip(this.create([
            'four', 'five', 'six', 'seven'
        ]), (x: string, y: string): string => {
            return `${x}+${y}`;
        }).toArray()).toEqual([
            'one+four', 'two+five', 'three+six'
        ]);
    }
}
