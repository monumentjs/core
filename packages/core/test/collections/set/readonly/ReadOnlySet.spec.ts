import {EqualityComparator, IgnoreCaseEqualityComparator, ReadOnlySet, Sequence} from '../../../..';
import {testQueryable} from '../../base/Queryable.spec';

export function testReadOnlySet(create: <T>(items?: Sequence<T>, comparator?: EqualityComparator<T>) => ReadOnlySet<T>) {
    describe('ReadOnlySet', function () {
        testQueryable(create);

        describe('constructor()', function () {
            const set: ReadOnlySet<string> = create(['one', 'One', 'ONE', 'two'], IgnoreCaseEqualityComparator.get());

            expect(set.length).toBe(2);
            expect(set.toArray()).toEqual(['one', 'two']);
        });

        describe('isProperSubsetOf()', function () {

        });

        describe('isProperSupersetOf()', function () {

        });

        describe('isSubsetOf()', function () {

        });

        describe('isSupersetOf()', function () {

        });

        describe('overlaps()', function () {

        });

        describe('setEquals()', function () {

        });
    });
}
