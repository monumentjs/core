import {LinkedList} from '../../../Source/Collections/LinkedList';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {ArgumentIndexOutOfBoundsException} from '../../../Source/Exceptions/ArgumentIndexOutOfBoundsException';
import {ArgumentRangeException} from '../../../Source/Exceptions/ArgumentRangeException';
import {RangeException} from '../../../Source/Exceptions/RangeException';


describe(`LinkedList`, () => {
    let list: LinkedList<string>;
    
    
    beforeEach(() => {
        list = new LinkedList();
    });
    
    
    describe(`[Symbol.iterator]`, () => {
        it(`allows to iterate list items`, () => {
            const items: string[] = ['one', 'two', 'three', 'four', 'five'];
            const copy: string[] = [];

            list.addAll(items);

            for (let item of list) {
                copy.push(item);
            }

            expect(copy).toEqual(items);
        });
    });


    describe(`add()`, () => {
        it(`adds set of values`, () => {
            expect(list.isEmpty).toBe(true);
            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);

            expect(list.add('one')).toBe(true);

            expect(list.isEmpty).toBe(false);
            expect(list.length).toBe(1);
            expect(list.toArray()).toEqual(['one']);

            expect(list.add('two')).toBe(true);

            expect(list.isEmpty).toBe(false);
            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual(['one', 'two']);

            expect(list.add('three')).toBe(true);

            expect(list.isEmpty).toBe(false);
            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['one', 'two', 'three']);
        });
    });


    describe(`addAll()`, () => {
        it(`accepts empty lists`, () => {
            expect(list.addAll([])).toBe(false);

            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);
        });

        it(`adds set of values`, () => {
            expect(list.addAll(['one', 'two', 'three'])).toBe(true);

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['one', 'two', 'three']);

            expect(list.addAll(['four', 'five', 'six'])).toBe(true);

            expect(list.length).toBe(6);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four', 'five', 'six']);
        });
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
            list = new LinkedList(['one', 'four']);

            list.insertAll(1, ['two', 'three']);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four']);

            list.insertAll(4, ['five', 'six']);

            expect(list.length).toBe(6);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four', 'five', 'six']);
        });
    });


    describe(`contains()`, () => {
        it(`determines whether list has specified value using default equality equality comparator`, () => {
            expect(list.contains('one')).toBe(false);
            expect(list.contains('two')).toBe(false);
            expect(list.contains('three')).toBe(false);

            list.addAll(['one', 'two', 'three']);

            expect(list.contains('one')).toBe(true);
            expect(list.contains('two')).toBe(true);
            expect(list.contains('three')).toBe(true);

            expect(list.contains('ONE')).toBe(false);
            expect(list.contains('TWO')).toBe(false);
            expect(list.contains('THREE')).toBe(false);
        });

        it(`uses custom equality comparator to compare items`, () => {
            expect(list.contains('one', IgnoreCaseComparator.instance)).toBe(false);
            expect(list.contains('two', IgnoreCaseComparator.instance)).toBe(false);
            expect(list.contains('three', IgnoreCaseComparator.instance)).toBe(false);

            list.addAll(['one', 'two', 'three']);

            expect(list.contains('one', IgnoreCaseComparator.instance)).toBe(true);
            expect(list.contains('two', IgnoreCaseComparator.instance)).toBe(true);
            expect(list.contains('three', IgnoreCaseComparator.instance)).toBe(true);

            expect(list.contains('ONE', IgnoreCaseComparator.instance)).toBe(true);
            expect(list.contains('TWO', IgnoreCaseComparator.instance)).toBe(true);
            expect(list.contains('THREE', IgnoreCaseComparator.instance)).toBe(true);
        });
    });


    describe(`containsAll()`, () => {
        it(`accepts empty lists`, () => {
            expect(list.containsAll([])).toBe(true);
        });

        it(`determines whether list has specified value using default equality equality comparator`, () => {
            expect(list.containsAll(['one', 'two', 'three'])).toBe(false);

            list.addAll(['one', 'two', 'three']);

            expect(list.containsAll(['one', 'two', 'three'])).toBe(true);
            expect(list.containsAll(['ONE', 'TWO', 'THREE'])).toBe(false);
        });

        it(`uses custom equality comparator to compare items`, () => {
            expect(list.containsAll(['one', 'two', 'three'], IgnoreCaseComparator.instance)).toBe(false);

            list.addAll(['one', 'two', 'three']);

            expect(list.containsAll(['one', 'two', 'three'], IgnoreCaseComparator.instance)).toBe(true);
            expect(list.containsAll(['ONE', 'TWO', 'THREE'], IgnoreCaseComparator.instance)).toBe(true);
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
            list = new LinkedList(['one', 'two']);

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
            list = new LinkedList(['one', 'two']);

            expect(list.indexOf('one', 1)).toEqual(-1);
            expect(list.indexOf('two', 1)).toEqual(1);
        });

        it(`finds index of given item in specified range`, () => {
            list = new LinkedList(['one', 'two', 'three', 'four']);

            expect(list.indexOf('four', 0, 2)).toBe(-1);
            expect(list.indexOf('four', 0, 4)).toBe(3);
        });

        it(`throws if search range is out of bounds`, () => {
            list = new LinkedList(['one', 'two', 'three', 'four']);

            expect(() => {
                list.indexOf('one', 0, -1);
            }).toThrowError(ArgumentRangeException);

            expect(() => {
                list.indexOf('one', 0, 5);
            }).toThrowError(RangeException);
        });

        it(`finds index of given item using custom equality comparator`, () => {
            list = new LinkedList(['one', 'two']);

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
            list = new LinkedList(['one', 'two', 'three', 'four']);

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
            list = new LinkedList(['one', 'two', 'one', 'two', 'three', 'four']);

            expect(list.lastIndexOf('four')).toEqual(5);
            expect(list.lastIndexOf('three')).toEqual(4);
            expect(list.lastIndexOf('two')).toEqual(3);
            expect(list.lastIndexOf('one')).toEqual(2);
            expect(list.lastIndexOf('five')).toEqual(-1);
        });

        it(`finds index of given item starting with specified index`, () => {
            list = new LinkedList(['one', 'two', 'one', 'two', 'three', 'four']);

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
            list = new LinkedList(['one', 'two', 'three', 'four']);

            expect(list.lastIndexOf('one', 3, 2)).toBe(-1);
            expect(list.lastIndexOf('one', 3, 4)).toBe(0);
        });

        it(`finds index of given item using custom equality comparator`, () => {
            list = new LinkedList(['one', 'two']);

            expect(list.lastIndexOf('ONE')).toBe(-1);
            expect(list.lastIndexOf('ONE', 0, 1, IgnoreCaseComparator.instance)).toBe(0);
            expect(list.lastIndexOf('ONE', 1, 1, IgnoreCaseComparator.instance)).toBe(-1);
            expect(list.lastIndexOf('THREE', 0, 1, IgnoreCaseComparator.instance)).toBe(-1);
        });
    });


    describe(`remove()`, () => {
        it(`removes item`, () => {
            list.addAll(['one', 'two', 'three']);

            expect(list.remove('four')).toBe(false);

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['one', 'two', 'three']);

            expect(list.remove('three')).toBe(true);

            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual(['one', 'two']);

            expect(list.remove('one')).toBe(true);

            expect(list.length).toBe(1);
            expect(list.toArray()).toEqual(['two']);

            expect(list.remove('two')).toBe(true);

            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);
        });
    });


    describe(`removeAll()`, () => {
        it(`accepts empty lists`, () => {
            list.addAll(['one', 'two', 'three', 'four', 'five']);

            expect(list.removeAll([])).toBe(false);

            expect(list.length).toBe(5);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);
        });

        it(`ignores not-existing items`, () => {
            list.addAll(['one', 'two', 'three', 'four', 'five']);

            expect(list.removeAll(['six'])).toBe(false);

            expect(list.length).toBe(5);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'four', 'five']);

            expect(list.removeAll(['four', 'six'])).toBe(true);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'two', 'three', 'five']);
        });

        it(`removes all items that contains in current list`, () => {
            list.addAll(['one', 'two', 'three', 'four', 'five']);

            expect(list.removeAll(['two'])).toBe(true);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'three', 'four', 'five']);

            expect(list.removeAll(['five'])).toBe(true);

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['one', 'three', 'four']);

            expect(list.removeAll(['one', 'three'])).toBe(true);

            expect(list.length).toBe(1);
            expect(list.toArray()).toEqual(['four']);

            expect(list.removeAll(['four'])).toBe(true);

            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);
        });
    });


    describe(`removeAt()`, () => {
        it(`throws if index is out bounds`, () => {
            expect(() => list.removeAt(0)).toThrow(ArgumentIndexOutOfBoundsException);

            list.addAll(['one', 'two', 'three']);

            expect(() => list.removeAt(4)).toThrow(ArgumentIndexOutOfBoundsException);
        });

        it(`removes item at specified index`, () => {
            list.addAll(['one', 'two', 'three']);

            expect(list.removeAt(2)).toBe('three');

            expect(list.toArray()).toEqual(['one', 'two']);
            expect(list.length).toBe(2);

            expect(list.removeAt(0)).toBe('one');

            expect(list.toArray()).toEqual(['two']);
            expect(list.length).toBe(1);

            expect(list.removeAt(0)).toBe('two');

            expect(list.toArray()).toEqual([]);
            expect(list.length).toBe(0);
        });
    });


    describe(`removeBy()`, () => {
        it(`removes items for whose predicate function returned 'true'`, () => {
            list.addAll(['one', 'two', 'three', 'one', 'two', 'three']);

            list.removeBy((value: string): boolean => {
                return value === 'three';
            });

            expect(list.toArray()).toEqual(['one', 'two', 'one', 'two']);
            expect(list.length).toBe(4);

            list.removeBy((value: string, index: number): boolean => {
                return value === 'one' && index < 2;
            });

            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual(['two', 'one', 'two']);
        });
    });


    describe(`retainAll()`, () => {
        it(`accepts empty lists`, () => {
            list.addAll(['one', 'two', 'three', 'four', 'five']);

            expect(list.retainAll([])).toBe(true);

            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);
        });

        it(`removes all items except those in specified list`, () => {
            list.addAll(['one', 'two', 'three', 'One', 'Two', 'Three']);

            expect(list.retainAll(['one', 'Three'])).toBe(true);

            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual(['one', 'Three']);
        });

        it(`uses custom equality comparator`, () => {
            list.addAll(['one', 'two', 'three', 'One', 'Two', 'Three']);

            expect(list.retainAll(['one', 'Three'], IgnoreCaseComparator.instance)).toBe(true);

            expect(list.length).toBe(4);
            expect(list.toArray()).toEqual(['one', 'three', 'One', 'Three']);
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
            list.addAll(['one', 'two', 'three']);

            expect(list.slice(1, 1).toArray()).toEqual(['two']);
            expect(list.slice(2, 1).toArray()).toEqual(['three']);
            expect(list.slice(1, 2).toArray()).toEqual(['two', 'three']);
        });
    });


    describe('clear()', () => {
        it('clears collection', () => {
            list.addAll(['one', 'two']);

            expect(list.length).toBe(2);

            expect(list.clear()).toBe(true);

            expect(list.length).toBe(0);
            expect(list.toArray()).toEqual([]);
        });
    });


    describe('clone()', () => {
        it('returns copy of list', () => {
            list.addAll(['one', 'two', 'three', 'four']);

            const copy: LinkedList<string> = list.clone();

            expect(copy.length).toBe(4);
            expect(copy.toArray()).toEqual(['one', 'two', 'three', 'four']);
        });
    });


    describe('equals()', () => {
        it('checks equality with native array', () => {
            const listA: LinkedList<string> = new LinkedList(['one', 'two', 'three', 'four']);

            expect(listA.equals(['one', 'two', 'three', 'four'])).toBe(true);
            expect(listA.equals(['one', 'two', 'three'])).toBe(false);
        });

        it('checks equality with collection', () => {
            const listA: LinkedList<string> = new LinkedList(['one', 'two', 'three', 'four']);

            expect(listA.equals(['one', 'two', 'three', 'four'])).toBe(true);
            expect(listA.equals(['one', 'two', 'three'])).toBe(false);
        });

        it('checks equality with linked lists', () => {
            const listA: LinkedList<string> = new LinkedList(['one', 'two', 'three', 'four']);
            const listB: LinkedList<string> = new LinkedList(['one', 'two', 'three', 'four']);
            const listC: LinkedList<string> = new LinkedList(['one', 'two', 'three']);

            expect(listA.equals(listB)).toBe(true);
            expect(listA.equals(listC)).toBe(false);
        });
    });
});
