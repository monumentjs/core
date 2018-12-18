import {
    IgnoreCaseEqualityComparator,
    IndexOutOfBoundsException,
    RangeException,
    ReadOnlyList,
    Sequence,
    StrictEqualityComparator
} from '../../../..';
import {testReadOnlyCollection} from '../../collection/readonly/ReadOnlyCollection.spec';

export function testReadOnlyList(create: <I>(items?: Sequence<I>) => ReadOnlyList<I>) {
    describe('ReadOnlyList', function () {
        testReadOnlyCollection(create);

        describe('firstIndex', function () {
            it('should return -1 when list is empty', function () {
                const list: ReadOnlyList<string> = create();

                expect(list.firstIndex).toBe(-1);
            });

            it('should return 0 when list is not empty', function () {
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

        describe('lastIndex', function () {
            it('should return -1 when list is empty', function () {
                const list: ReadOnlyList<string> = create();

                expect(list.lastIndex).toBe(-1);
            });

            it('should return index of last item when list is not empty', function () {
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

        describe('getAt()', function () {
            it('should throw IndexOutOfBoundsException if index out of bounds', function () {
                const list = create();
                const oneElementList = create(['a']);
                const twoElementList = create(['a', 'b']);

                expect(() => {
                    list.getAt(0);
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    list.getAt(-1);
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    oneElementList.getAt(1);
                }).toThrow(IndexOutOfBoundsException);

                expect(() => {
                    twoElementList.getAt(2);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should return item with specified index', function () {
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

        describe('indexOf()', function () {
            it('should not throw if start index equals to 0 and list length is 0', function () {
                const list = create();

                list.indexOf('one', StrictEqualityComparator.get(), 0);
            });

            it('should find index of given item in specified range', function () {
                const list = create(['one', 'two', 'three', 'four']);

                expect(list.indexOf('four', StrictEqualityComparator.get(), 0, 2)).toBe(-1);
                expect(list.indexOf('four', StrictEqualityComparator.get(), 0, 4)).toBe(3);
            });

            it('should find index of given item starting from first element', function () {
                const list = create(['one', 'two']);

                expect(list.indexOf('one')).toBe(0);
                expect(list.indexOf('two')).toBe(1);
                expect(list.indexOf('three')).toBe(-1);
            });

            it('should find index of given item starting from specified index', function () {
                const list = create(['one', 'two']);

                expect(list.indexOf('one', StrictEqualityComparator.get(), 1)).toBe(-1);
                expect(list.indexOf('two', StrictEqualityComparator.get(), 1)).toBe(1);
            });

            it('should find index of given item using custom equality comparator', function () {
                const list = create(['one', 'two']);

                expect(list.indexOf('ONE')).toBe(-1);
                expect(list.indexOf('ONE', IgnoreCaseEqualityComparator.get(), 0, list.length)).toBe(0);
                expect(list.indexOf('ONE', IgnoreCaseEqualityComparator.get(), 1, list.length - 1)).toBe(-1);
                expect(list.indexOf('THREE', IgnoreCaseEqualityComparator.get(), 0, list.length)).toBe(-1);
            });

            it('should throw if start index is out of bounds', function () {
                const list = create();

                expect(() => {
                    list.indexOf('one', StrictEqualityComparator.get(), 1);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw if search range is out of bounds', function () {
                const list = create(['one', 'two', 'three', 'four']);

                expect(() => {
                    list.indexOf('one', StrictEqualityComparator.get(), 0, -1);
                }).toThrow(RangeException);

                expect(() => {
                    list.indexOf('one', StrictEqualityComparator.get(), 0, 5);
                }).toThrow(RangeException);
            });
        });

        describe('lastIndexOf()', function () {
            it('should throw RangeException if search range length specified as negative number', function () {
                const list = create(['one', 'two', 'three', 'four']);

                list.lastIndexOf('one', StrictEqualityComparator.get(), 0, 1);

                expect(() => {
                    list.lastIndexOf('one', StrictEqualityComparator.get(), 0, 5);
                }).toThrow(RangeException);
            });

            it('should not throw if `startIndex` argument is 0 and list length is 0', function () {
                const list = create();

                list.lastIndexOf('one', StrictEqualityComparator.get(), 0);
            });

            it('should not throw if `startIndex` argument is not defined', function () {
                const list = create();

                list.lastIndexOf('one');
            });

            it('should find index of given item', function () {
                const list = create(['one', 'two', 'one', 'two', 'three', 'four']);

                expect(list.lastIndexOf('four')).toBe(5);
                expect(list.lastIndexOf('three')).toBe(4);
                expect(list.lastIndexOf('two')).toBe(3);
                expect(list.lastIndexOf('one')).toBe(2);
                expect(list.lastIndexOf('five')).toBe(-1);
            });

            it('should find index of given item in specified range', function () {
                const list = create(['one', 'two', 'three', 'four']);

                expect(list.lastIndexOf('one', StrictEqualityComparator.get(), 3, 2)).toBe(-1);
                expect(list.lastIndexOf('one', StrictEqualityComparator.get(), 3, 4)).toBe(0);
            });

            it('should find index of given item starting with specified index', function () {
                const source = create(['one', 'two', 'one', 'two', 'three', 'four']);

                expect(source.lastIndexOf('five', StrictEqualityComparator.get(), 0)).toBe(-1);
                expect(source.lastIndexOf('one', StrictEqualityComparator.get(), 0)).toBe(0);
                expect(source.lastIndexOf('one', StrictEqualityComparator.get(), 1)).toBe(0);
                expect(source.lastIndexOf('one', StrictEqualityComparator.get(), 2)).toBe(2);
                expect(source.lastIndexOf('two', StrictEqualityComparator.get(), 2)).toBe(1);
                expect(source.lastIndexOf('two', StrictEqualityComparator.get(), 3)).toBe(3);
                expect(source.lastIndexOf('two', StrictEqualityComparator.get(), 4)).toBe(3);
                expect(source.lastIndexOf('three', StrictEqualityComparator.get(), 1)).toBe(-1);
                expect(source.lastIndexOf('three', StrictEqualityComparator.get(), 4)).toBe(4);
                expect(source.lastIndexOf('three', StrictEqualityComparator.get(), 5)).toBe(4);
                expect(source.lastIndexOf('four', StrictEqualityComparator.get(), 4)).toBe(-1);
                expect(source.lastIndexOf('four', StrictEqualityComparator.get(), 5)).toBe(5);
            });

            it('should find index of given item using custom equality comparator', function () {
                const list: ReadOnlyList<string> = create(['one', 'two']);

                expect(list.lastIndexOf('ONE')).toBe(-1);
                expect(list.lastIndexOf('ONE', IgnoreCaseEqualityComparator.get(), 0, 1)).toBe(0);
                expect(list.lastIndexOf('ONE', IgnoreCaseEqualityComparator.get(), 1, 1)).toBe(-1);
                expect(list.lastIndexOf('THREE', IgnoreCaseEqualityComparator.get(), 0, 1)).toBe(-1);
            });

            it('should throw if `startIndex` is out of bounds', function () {
                const list = create();

                expect(() => {
                    list.lastIndexOf('one', StrictEqualityComparator.get(), 1);
                }).toThrow(IndexOutOfBoundsException);
            });

            it('should throw if search range length is negative number', function () {
                const list = create(['one', 'two', 'three', 'four']);

                expect(() => {
                    list.lastIndexOf('one', StrictEqualityComparator.get(), 0, -1);
                }).toThrow(RangeException);
            });
        });

    });
}
