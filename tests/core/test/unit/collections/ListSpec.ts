import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {List} from '@monument/core/main/collections/List';
import {Grouping} from '@monument/core/main/collections/Grouping';
import {SortOrder} from '@monument/core/main/collections/SortOrder';
import {NamedPool} from '@monument/core/main/NamedPool';
import {RangeException} from '@monument/core/main/exceptions/RangeException';
import {IteratorFunction} from '@monument/core/main/collections/IteratorFunction';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {ArgumentRangeException} from '@monument/core/main/exceptions/ArgumentRangeException';
import {InvalidArgumentException} from '@monument/core/main/exceptions/InvalidArgumentException';
import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {CollectionSpec} from './CollectionSpec';


interface Book {
    authors: List<string>;
}


export abstract class ListSpec extends CollectionSpec {

    public abstract create<T>(items?: Iterable<T>): List<T>;


    @Test
    public 'insert() throws if index out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.insert(-1, 'one');
        }, ArgumentIndexOutOfBoundsException);

        assert.throws(() => {
            list.insert(1, 'one');
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'insert() inserts item into list'(assert: Assert) {
        let list: List<string> = this.create();

        list.insert(0, 'one');

        assert.equals(list.length, 1);
        assert.identical(list.toArray(), ['one']);

        list.insert(1, 'two');

        assert.equals(list.length, 2);
        assert.identical(list.toArray(), ['one', 'two']);

        list.insert(0, 'three');

        assert.equals(list.length, 3);
        assert.identical(list.toArray(), ['three', 'one', 'two']);
    }


    @Test
    public 'insertAll() throws if `index` is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.insertAll(1, ['one', 'two']);
        }, ArgumentIndexOutOfBoundsException);

        assert.throws(() => {
            list.insertAll(-1, ['one', 'two']);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'insertAll() inserts items at specified position'(assert: Assert) {
        let list: List<string> = this.create(['one', 'four']);

        list.insertAll(1, ['two', 'three']);

        assert.equals(list.length, 4);
        assert.identical(list.toArray(), ['one', 'two', 'three', 'four']);
    }


    @Test
    public 'removeAt() throws if `index` argument is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.removeAt(-1);
        }, ArgumentIndexOutOfBoundsException);

        assert.throws(() => {
            list.removeAt(4);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'removeAt() removes item with specified index from list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two']);

        assert.equals(list.removeAt(1), 'two');

        assert.equals(list.length, 1);
        assert.identical(list.toArray(), ['one']);

        assert.equals(list.removeAt(0), 'one');

        assert.equals(list.length, 0);

    }


    @Test
    public 'indexOf() does not throws if `startIndex` argument is undefined'() {
        let list: List<string> = this.create();

        list.indexOf('one');
    }


    @Test
    public 'indexOf() does not throws if `startIndex` argument is 0 and list length is 0'() {
        let list: List<string> = this.create();

        list.indexOf('one', 0);
    }


    @Test
    public 'indexOf() finds index of given item starting from first element'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two']);

        assert.equals(list.indexOf('one'), 0);
        assert.equals(list.indexOf('two'), 1);
        assert.equals(list.indexOf('three'), -1);
    }


    @Test
    public 'indexOf() throws if `startIndex` is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.indexOf('one', 1);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'indexOf() finds index of given item starting from specified index'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two']);

        assert.equals(list.indexOf('one', 1), -1);
        assert.equals(list.indexOf('two', 1), 1);
    }


    @Test
    public 'indexOf() finds index of given item in specified range'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        assert.equals(list.indexOf('four', 0, 2), -1);
        assert.equals(list.indexOf('four', 0, 4), 3);
    }


    @Test
    public 'indexOf() throws if search range is out of bounds'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        assert.throws(() => {
            list.indexOf('one', 0, -1);
        }, InvalidArgumentException);

        assert.throws(() => {
            list.indexOf('one', 0, 5);
        }, RangeException);
    }


    @Test
    public 'indexOf() finds index of given item using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let list: List<string> = this.create(['one', 'two']);

        assert.equals(list.indexOf('ONE'), -1);
        assert.equals(list.indexOf('ONE', 0, list.length, comparator), 0);
        assert.equals(list.indexOf('ONE', 1, list.length - 1, comparator), -1);
        assert.equals(list.indexOf('THREE', 0, list.length, comparator), -1);
    }


    @Test
    public 'lastIndexOf() does not throws if `startIndex` argument is not defined'() {
        let list: List<string> = this.create();

        list.lastIndexOf('one');
    }


    @Test
    public 'lastIndexOf() does not throws if `startIndex` argument is 0 and list length is 0'() {
        let list: List<string> = this.create();

        list.lastIndexOf('one', 0);
    }


    @Test
    public 'lastIndexOf() throws if `startIndex` is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.lastIndexOf('one', 1);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'lastIndexOf() throws if search range length specified as negative number'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        assert.throws(() => {
            list.lastIndexOf('one', 0, -1);
        }, InvalidArgumentException);
    }


    @Test
    public 'lastIndexOf() does not throw RangeException if search range length specified as negative number'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        list.lastIndexOf('one', 0, 1);

        assert.throws(() => {
            list.lastIndexOf('one', 0, 5);
        }, ArgumentRangeException);
    }


    @Test
    public 'lastIndexOf() finds index of given item'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'one', 'two', 'three', 'four']);

        assert.equals(list.lastIndexOf('four'), 5);
        assert.equals(list.lastIndexOf('three'), 4);
        assert.equals(list.lastIndexOf('two'), 3);
        assert.equals(list.lastIndexOf('one'), 2);
        assert.equals(list.lastIndexOf('five'), -1);
    }


    @Test
    public 'lastIndexOf() finds index of given item starting with specified index'(assert: Assert) {
        const list: List<string> = this.create(['one', 'two', 'one', 'two', 'three', 'four']);

        assert.equals(list.lastIndexOf('one', 0), 0);
        assert.equals(list.lastIndexOf('one', 1), 0);
        assert.equals(list.lastIndexOf('one', 2), 2);
        assert.equals(list.lastIndexOf('two', 2), 1);
        assert.equals(list.lastIndexOf('two', 3), 3);
        assert.equals(list.lastIndexOf('two', 4), 3);
        assert.equals(list.lastIndexOf('three', 1), -1);
        assert.equals(list.lastIndexOf('three', 4), 4);
        assert.equals(list.lastIndexOf('three', 5), 4);
        assert.equals(list.lastIndexOf('four', 4), -1);
        assert.equals(list.lastIndexOf('four', 5), 5);
    }


    @Test
    public 'lastIndexOf() finds index of given item in specified range'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three', 'four']);

        assert.equals(list.lastIndexOf('one', 3, 2), -1);
        assert.equals(list.lastIndexOf('one', 3, 4), 0);
    }


    @Test
    public 'lastIndexOf() finds index of given item using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let list: List<string> = this.create(['one', 'two']);

        assert.equals(list.lastIndexOf('ONE'), -1);
        assert.equals(list.lastIndexOf('ONE', 0, 1, comparator), 0);
        assert.equals(list.lastIndexOf('ONE', 1, 1, comparator), -1);
        assert.equals(list.lastIndexOf('THREE', 0, 1, comparator), -1);
    }


    @Test
    public 'forEach() iterates over list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two']);
        let mock = new FunctionMock<IteratorFunction<string, void>>();

        list.forEach(mock.value);

        assert.equals(mock.calls.length, 2);
    }


    @Test
    public 'aggregate() aggregates list data into new value'(assert: Assert) {
        const list: List<string> = this.create([
            'one',
            'two',
            'three'
        ]);
        const map: NamedPool<boolean> = list.aggregate((obj: NamedPool<boolean>, item: string): NamedPool<boolean> => {
            obj[item] = true;

            return obj;
        }, {});

        assert.identical(map, {
            one: true,
            two: true,
            three: true
        });
    }


    @Test
    public 'select() returns list of selected values'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let firstChars: List<string> = list.select((word: string): string => {
            return word[0];
        });

        assert.equals(firstChars.length, 3);
        assert.identical(firstChars.toArray(), ['o', 't', 't']);
    }


    @Test
    public 'selectMany() returns list of selected values'(assert: Assert) {
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

        assert.equals(authorNames.length, 3);

        assert.identical(authorNames.toArray(), [
            'Johan', 'Steve', 'Kent'
        ]);
    }


    @Test
    public 'where() returns list of items for whose predicate function returned `true`'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let wordsOfThreeChars: List<string> = list.where((word: string): boolean => {
            return word.length === 3;
        });

        assert.equals(wordsOfThreeChars.length, 2);
        assert.identical(wordsOfThreeChars.toArray(), ['one', 'two']);
    }


    @Test
    public 'all() throws if list is empty'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.all((): boolean => {
                return true;
            });
        }, InvalidOperationException);
    }


    @Test
    public 'all() determines whether all elements of a sequence satisfy a condition'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.true(list.all((word: string): boolean => {
            return word.length >= 3;
        }));

        assert.false(list.all((word: string): boolean => {
            return word.length < 5;
        }));
    }


    @Test
    public 'any() throws if list is empty'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.any((): boolean => {
                return true;
            });
        }, InvalidOperationException);
    }


    @Test
    public 'any() determines whether any of elements satisfy a condition'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.true(list.any((word: string): boolean => {
            return word.length === 3;
        }));

        assert.true(list.any((word: string): boolean => {
            return word.length === 5;
        }));
    }


    @Test
    public 'average() throws if list is empty'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.average((): number => {
                return 0;
            });
        }, InvalidOperationException);
    }


    @Test
    public 'average() calculates average value'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'six']);

        assert.equals(list.average((word: string): number => {
            return word.length;
        }), 3);
    }


    @Test
    public 'count() calculates count of items matching predicate'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.equals(list.count((word: string): boolean => {
            return word.length > 3;
        }), 1);
    }


    @Test
    public 'first() returns first item matching predicate'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.equals(list.first((word: string): boolean => {
            return word.length === 3;
        }), 'one');

        assert.equals(list.first((word: string): boolean => {
            return word.length === 4;
        }), undefined);

        assert.equals(list.first((word: string): boolean => {
            return word.length === 4;
        }, 'fallback'), 'fallback');
    }


    @Test
    public 'firstOrDefault() returns first item of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.equals(list.firstOrDefault('fallback'), 'one');
    }


    @Test
    public 'firstOrDefault() returns fallback value if list is empty'(assert: Assert) {
        let list: List<string> = this.create();

        assert.equals(list.firstOrDefault('fallback'), 'fallback');
    }


    @Test
    public 'last() returns last item matching predicate'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.equals(list.last((word: string): boolean => {
            return word.length === 3;
        }), 'two');

        assert.equals(list.last((word: string): boolean => {
            return word.length === 4;
        }), undefined);

        assert.equals(list.last((word: string): boolean => {
            return word.length === 4;
        }, 'fallback'), 'fallback');
    }


    @Test
    public 'lastOrDefault() returns last item of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.equals(list.lastOrDefault('fallback'), 'three');
    }


    @Test
    public 'lastOrDefault() returns fallback value if list is empty'(assert: Assert) {
        let list: List<string> = this.create();

        assert.equals(list.lastOrDefault('fallback'), 'fallback');
    }


    @Test
    public 'distinct() returns list of distinct items'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'one']);
        let distinctItems: List<string> = list.distinct();

        assert.notIdentical(list, distinctItems);

        assert.equals(list.length, 3);
        assert.identical(list.toArray(), ['one', 'two', 'one']);

        assert.equals(distinctItems.length, 2);
        assert.identical(distinctItems.toArray(), ['one', 'two']);
    }


    @Test
    public 'groupBy() returns list of grouped items using default comparator'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        let groups: List<Grouping<number, string>> = list.groupBy((word: string): number => {
            return word.length;
        });

        assert.equals(groups.length, 2);
        assert.equals(groups.getAt(0).key, 3);
        assert.identical(groups.getAt(0).toArray(), ['one', 'two']);
        assert.equals(groups.getAt(1).key, 5);
        assert.identical(groups.getAt(1).toArray(), ['three']);
    }


    @Test
    public 'groupBy() returns list of grouped items using custom comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        const list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        const groups: List<Grouping<string, string>> = list.groupBy((word: string): string => {
            return word[0].toLowerCase();
        }, comparator);

        assert.equals(groups.length, 2);
        assert.equals(groups.getAt(0).key, 't');
        assert.identical(groups.getAt(0).toArray(), ['two', 'Three']);
        assert.equals(groups.getAt(1).key, 'o');
        assert.identical(groups.getAt(1).toArray(), ['ONE', 'one', 'One']);
    }


    @Test
    public 'except() returns list without specified items using default comparator'(assert: Assert) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let filteredList: List<string> = list.except(this.create(['Three']));

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), ['two', 'ONE', 'one', 'One']);

        filteredList = list.except(this.create(['Five']));

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), ['two', 'ONE', 'one', 'Three', 'One', 'Five']);
    }


    @Test
    public 'except() returns list without specified items using custom comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let filteredList: List<string> = list.except(this.create(['one', 'Five']), comparator);

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), ['two', 'Three', 'Five']);
    }


    @Test
    public 'intersect() returns list without specified items using default comparator'(assert: Assert) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let filteredList: List<string> = list.intersect(this.create(['Three', 'Four']));

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), ['Three']);

        filteredList = list.intersect(this.create(['Five']));

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), []);
    }


    @Test
    public 'intersect() returns list without specified items using custom comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let filteredList: List<string> = list.intersect(this.create(['one', 'Five']), comparator);

        assert.notEquals(filteredList, list);
        assert.identical(filteredList.toArray(), ['ONE', 'one', 'One']);
    }


    @Test
    public 'join() joins lists using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let listA: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let listB: List<string> = this.create(['Ten', 'Once', 'Twelve']);
        let combo: List<string[]> = listA.join(listB, (word: string): string => {
            return word[0];
        }, (word: string): string => {
            return word[0];
        }, function (x: string, y: string): string[] {
            return [x, y];
        }, comparator);

        assert.identical(combo.toArray(), [
            ['two', 'Ten'],
            ['two', 'Twelve'],
            ['ONE', 'Once'],
            ['one', 'Once'],
            ['Three', 'Ten'],
            ['Three', 'Twelve'],
            ['One', 'Once']
        ]);
    }


    @Test
    public 'min() throws if list is empty'(assert: Assert) {
        const list: List<string> = this.create();

        assert.throws(() => {
            list.min((word: string): number => {
                return word.length;
            });
        }, InvalidOperationException);
    }


    @Test
    public 'min() returns minimal value'(assert: Assert) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        assert.equals(list.min((word: string): number => {
            return word.length;
        }), 3);
    }


    @Test
    public 'max() throws if list is empty'(assert: Assert) {

        let list: List<string> = this.create();

        assert.throws(() => {
            list.max((word: string): number => {
                return word.length;
            });
        }, InvalidOperationException);
    }


    @Test
    public 'max() returns maximal value'(assert: Assert) {
        let list: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);

        assert.equals(list.max((word: string): number => {
            return word.length;
        }), 5);
    }


    @Test
    public 'orderBy() returns sorted list using ascending sort order'(assert: Assert, comparator: IgnoreCaseComparator) {
        let originalList: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let orderedList: List<string> = originalList.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, comparator, SortOrder.ASCENDING);

        assert.identical(orderedList.toArray(), [
            'ONE', 'one', 'One', 'Three', 'two'
        ]);
    }


    @Test
    public 'orderBy() returns sorted list using descending sort order'(assert: Assert, comparator: IgnoreCaseComparator) {
        let originalList: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let orderedList: List<string> = originalList.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, comparator, SortOrder.DESCENDING);

        assert.identical(orderedList.toArray(), [
            'two', 'Three', 'ONE', 'one', 'One'
        ]);
    }


    @Test
    public 'orderBy() returns sorted list using custom no sort order'(assert: Assert, comparator: IgnoreCaseComparator) {
        let originalList: List<string> = this.create(['two', 'ONE', 'one', 'Three', 'One']);
        let orderedList: List<string> = originalList.orderBy((word: string): string => {
            return word.slice(0, 2);
        }, comparator, SortOrder.NONE);

        assert.identical(orderedList.toArray(), [
            'two', 'ONE', 'one', 'Three', 'One'
        ]);
    }


    @Test
    public 'reverse() returns reversed list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);
        let reversedList: List<string> = list.reverse();

        assert.identical(reversedList.toArray(), ['three', 'two', 'one']);
    }


    @Test
    public 'skip() throws if offset is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        list.skip(0);

        assert.throws(() => {
            list.skip(1);
        }, ArgumentIndexOutOfBoundsException);

        assert.throws(() => {
            list.skip(-10);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'skip() returns slice of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.skip(1).toArray(), ['two', 'three']);
    }


    @Test
    public 'skipWhile() works with empty lists'(assert: Assert) {
        let list: List<string> = this.create();
        let slice: List<string> = list.skipWhile((word: string): boolean => {
            return word[0] !== 't';
        });

        assert.identical(slice.toArray(), []);
    }


    @Test
    public 'skipWhile() returns slice of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);
        let slice: List<string> = list.skipWhile((word: string): boolean => {
            return word[0] !== 't';
        });

        assert.identical(slice.toArray(), ['two', 'three']);
    }


    @Test
    public 'take() throws if length is out of bounds'(assert: Assert) {
        let list: List<string> = this.create();

        list.take(0);

        assert.throws(() => {
            list.take(1);
        }, RangeException);

        assert.throws(() => {
            list.take(-10);
        }, RangeException);
    }


    @Test
    public 'take() returns slice of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.take(2).toArray(), ['one', 'two']);
    }


    @Test
    public 'takeWhile() works with empty lists'(assert: Assert) {
        let list: List<string> = this.create();
        let slice: List<string> = list.takeWhile((word: string): boolean => {
            return word[0] !== 't';
        });

        assert.identical(slice.toArray(), []);
    }


    @Test
    public 'takeWhile() returns slice of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);
        let slice: List<string> = list.takeWhile((word: string): boolean => {
            return word[0] !== 't';
        });

        assert.identical(slice.toArray(), ['one']);
    }


    @Test
    public 'slice() throws if slice range is invalid'(assert: Assert) {
        let list: List<string> = this.create();

        assert.throws(() => {
            list.slice(0, 1);
        }, RangeException);
        assert.throws(() => {
            list.slice(-1, 0);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'slice() works with empty lists'(assert: Assert) {
        let list: List<string> = this.create();

        assert.identical(list.slice(0, 0).toArray(), []);
    }


    @Test
    public 'slice() returns slice of list'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.slice(1, 1).toArray(), ['two']);
        assert.identical(list.slice(2, 1).toArray(), ['three']);
        assert.identical(list.slice(1, 2).toArray(), ['two', 'three']);
    }


    @Test
    public 'concat() returns concatenation of lists'(assert: Assert) {
        let list: List<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.concat(this.create(['four', 'five'])).toArray(), ['one', 'two', 'three', 'four', 'five']);
        assert.equals(list.length, 3);
    }


    @Test
    public 'union() returns union of lists'(assert: Assert) {
        let listA: List<string> = this.create(['one', 'two', 'three']);
        let listB: List<string> = this.create([
            'four', 'one', 'two', 'three', 'five'
        ]);
        let union = listA.union(listB);

        assert.equals(union.length, 5);
        assert.identical(union.toArray(), [
            'one', 'two', 'three', 'four', 'five'
        ]);
        assert.equals(listA.length, 3);
    }


    @Test
    public 'zip() returns list of combined items'(assert: Assert) {
        let listA: List<string> = this.create(['one', 'two', 'three']);
        let listB: List<string> = this.create(['four', 'five']);
        let listC: List<string> = this.create(['four', 'five', 'six', 'seven']);
        let comboAB: List<string> = listA.zip(listB, (x: string, y: string): string => {
            return `${x}+${y}`;
        });
        let comboAC: List<string> = listA.zip(listC, (x: string, y: string): string => {
            return `${x}+${y}`;
        });

        assert.identical(comboAB.toArray(), [
            'one+four', 'two+five'
        ]);

        assert.identical(comboAC.toArray(), [
            'one+four', 'two+five', 'three+six'
        ]);
    }
}
