import { EqualityComparator, IgnoreCaseEqualityComparator, ReadOnlySet, Sequence } from '../../../../..';
import { testReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection.spec';

export function testReadOnlySet(create: <T>(items?: Sequence<T>, comparator?: EqualityComparator<T>) => ReadOnlySet<T>) {
    describe('ReadOnlySet', function() {
        testReadOnlyCollection(create);

        describe('constructor()', function() {
            const set: ReadOnlySet<string> = create<string>(['one', 'One', 'ONE', 'two'], IgnoreCaseEqualityComparator.get());

            expect(set.length).toBe(2);
            expect(set.toArray()).toEqual(['one', 'two']);
        });

        describe('isProperSubsetOf()', function() {
            it('should determine whether current set is proper subset of given set', function() {
                const empty: ReadOnlySet<string> = create([]);
                const subSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const sameSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const superSet: ReadOnlySet<string> = create(['one', 'two', 'three', 'four']);

                expect(empty.isProperSubsetOf(empty)).toBe(false);
                expect(empty.isProperSubsetOf(subSet)).toBe(true);
                expect(empty.isProperSubsetOf(sameSet)).toBe(true);
                expect(empty.isProperSubsetOf(superSet)).toBe(true);
                expect(subSet.isProperSubsetOf(empty)).toBe(false);
                expect(subSet.isProperSubsetOf(sameSet)).toBe(false);
                expect(subSet.isProperSubsetOf(superSet)).toBe(true);
            });
        });

        describe('isProperSupersetOf()', function() {
            it('should determine whether current set is proper superset of given set', function() {
                const empty: ReadOnlySet<string> = create([]);
                const subSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const sameSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const superSet: ReadOnlySet<string> = create(['one', 'two', 'three', 'four']);

                expect(empty.isProperSupersetOf(empty)).toBe(false);
                expect(empty.isProperSupersetOf(subSet)).toBe(false);
                expect(empty.isProperSupersetOf(sameSet)).toBe(false);
                expect(empty.isProperSupersetOf(superSet)).toBe(false);
                expect(subSet.isProperSupersetOf(empty)).toBe(true);
                expect(subSet.isProperSupersetOf(sameSet)).toBe(false);
                expect(subSet.isProperSupersetOf(superSet)).toBe(false);
            });
        });

        describe('isSubsetOf()', function() {
            it('should determine whether current set is subset of given set', function() {
                const empty: ReadOnlySet<string> = create([]);
                const subSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const sameSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const superSet: ReadOnlySet<string> = create(['one', 'two', 'three', 'four']);

                expect(empty.isSubsetOf(empty)).toBe(true);
                expect(empty.isSubsetOf(subSet)).toBe(true);
                expect(empty.isSubsetOf(sameSet)).toBe(true);
                expect(empty.isSubsetOf(superSet)).toBe(true);
                expect(subSet.isSubsetOf(empty)).toBe(false);
                expect(subSet.isSubsetOf(sameSet)).toBe(true);
                expect(subSet.isSubsetOf(superSet)).toBe(true);
            });
        });

        describe('isSupersetOf()', function() {
            it('should determine whether current set is superset of given set', function() {
                const empty: ReadOnlySet<string> = create([]);
                const subSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const sameSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const superSet: ReadOnlySet<string> = create(['one', 'two', 'three', 'four']);

                expect(empty.isSupersetOf(empty)).toBe(true);
                expect(empty.isSupersetOf(subSet)).toBe(false);
                expect(empty.isSupersetOf(sameSet)).toBe(false);
                expect(empty.isSupersetOf(superSet)).toBe(false);
                expect(subSet.isSupersetOf(empty)).toBe(true);
                expect(subSet.isSupersetOf(sameSet)).toBe(true);
                expect(subSet.isSupersetOf(superSet)).toBe(false);
            });
        });

        describe('overlaps()', function() {
            it('should determine whether current set overlaps with other collection', function() {
                const empty: ReadOnlySet<string> = create([]);
                const singleSet: ReadOnlySet<string> = create(['one']);
                const subSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const sameSet: ReadOnlySet<string> = create(['one', 'two', 'three']);
                const superSet: ReadOnlySet<string> = create(['one', 'two', 'three', 'four']);

                expect(empty.overlaps(empty)).toBe(false);
                expect(empty.overlaps(subSet)).toBe(false);
                expect(empty.overlaps(sameSet)).toBe(false);
                expect(empty.overlaps(superSet)).toBe(false);
                expect(subSet.overlaps(empty)).toBe(false);
                expect(subSet.overlaps(singleSet)).toBe(true);
                expect(subSet.overlaps(sameSet)).toBe(true);
                expect(subSet.overlaps(superSet)).toBe(true);
            });
        });

        describe('setEquals()', function() {
            it('should determine whether set contains same elements as given collection', function() {
                const firstSet = create(['one', 'two', 'three']);
                const sameSet = create(['one', 'two', 'three']);
                const shuffledSet = create(['two', 'one', 'three']);
                const invertedSet = create(['three', 'two', 'one']);

                expect(firstSet.setEquals(sameSet)).toBe(true);
                expect(firstSet.setEquals(shuffledSet)).toBe(true);
                expect(firstSet.setEquals(invertedSet)).toBe(true);
            });
        });
    });
}
