import {Case} from '../../../../../test-drive/Decorators/Case';
import {Collection} from '../../../../../collections-core/main/Collection';
import {IgnoreCaseComparator} from '../../../../../text/main/IgnoreCaseComparator';
import {EnumerableSpec} from './EnumerableSpec';


export abstract class CollectionSpec extends EnumerableSpec {

    public abstract create<T>(items?: Iterable<T>): Collection<T>;


    @Case()
    public 'constructor() without arguments creates empty collection'() {
        let collection: Collection<string> = this.create();

        this.assertLengthAndIsEmpty(collection, 0);
    }


    @Case()
    public 'constructor([items]) creates collection with given items'() {
        let collection: Collection<string> = this.create(['one', 'two']);

        this.assertLengthAndIsEmpty(collection, 2);
    }


    @Case()
    public 'add() adds item into collection'() {
        let collection: Collection<string> = this.create();

        expect(collection.add('value')).toBe(true);

        this.assertLengthAndIsEmpty(collection, 1);

        expect(collection.add('value')).toBe(true);

        this.assertLengthAndIsEmpty(collection, 2);
    }


    @Case()
    public 'contains() determines whether collection contains specified item'() {
        let collection: Collection<string> = this.create(['one', 'two']);

        expect(collection.contains('one')).toBe(true);
        expect(collection.contains('two')).toBe(true);
        expect(collection.contains('three')).toBe(false);
    }


    @Case()
    public 'contains() determines whether collection contains specified item using custom equality comparator'() {
        let collection: Collection<string> = this.create(['one', 'two', 'THREE']);

        expect(collection.contains('One', IgnoreCaseComparator.instance)).toBe(true);
        expect(collection.contains('TWO', IgnoreCaseComparator.instance)).toBe(true);
        expect(collection.contains('three', IgnoreCaseComparator.instance)).toBe(true);
    }


    @Case()
    public 'remove() returns `false` if collection does not contains the item'() {
        let collection: Collection<string> = this.create();

        expect(collection.remove('itemThatIsNotInCollection')).toBe(false);
    }


    @Case()
    public 'remove() returns `true` if item was removed from collection'() {
        let collection: Collection<string> = this.create(['one', 'two']);

        expect(collection.remove('two')).toBe(true);

        this.assertLengthAndIsEmpty(collection, 1);

        expect(collection.remove('one')).toEqual(true);

        this.assertLengthAndIsEmpty(collection, 0);
    }


    @Case()
    public 'removeAll() removes items containing in both lists'() {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        this.assertLengthAndIsEmpty(collection, 6);

        collection.removeAll(['a', 'b']);

        this.assertLengthAndIsEmpty(collection, 2);

        expect(collection.toArray()).toEqual(['c', 'd']);
    }


    @Case()
    public 'removeAll() removes items containing in both lists using custom equality comparator'() {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        collection.removeAll(['A', 'B']);

        this.assertLengthAndIsEmpty(collection, 6);

        collection.removeAll(['A', 'B'], IgnoreCaseComparator.instance);

        this.assertLengthAndIsEmpty(collection, 2);

        expect(collection.toArray()).toEqual(['c', 'd']);
    }


    @Case()
    public 'removeBy() removes items for whose predicate function returns `true`'() {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        collection.removeBy((character: string): boolean => {
            return character === 'a';
        });

        this.assertLengthAndIsEmpty(collection, 3);

        expect(collection.toArray()).toEqual(['b', 'c', 'd']);
    }


    @Case()
    public 'retainAll() accepts empty lists'() {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'four', 'five']);

        expect(collection.retainAll([])).toBe(true);

        this.assertLengthAndIsEmpty(collection, 0);

        expect(collection.toArray()).toEqual([]);
    }


    @Case()
    public 'retainAll() removes all items except those in specified list'() {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(collection.retainAll(['one', 'Three'])).toBe(true);

        this.assertLengthAndIsEmpty(collection, 2);

        expect(collection.toArray()).toEqual(['one', 'Three']);
    }


    @Case()
    public 'retainAll() uses custom equality comparator'() {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        expect(collection.retainAll(['one', 'Three'], IgnoreCaseComparator.instance)).toBe(true);

        this.assertLengthAndIsEmpty(collection, 4);

        expect(collection.toArray()).toEqual(['one', 'three', 'One', 'Three']);
    }


    @Case()
    public 'clear() clears collection'() {
        let collection: Collection<string> = this.create(['one', 'two']);

        collection.clear();

        this.assertLengthAndIsEmpty(collection, 0);
    }


    protected assertLengthAndIsEmpty(items: Collection<string>, expectedLength: number): void {
        expect(items.length).toBe(expectedLength);
        expect(items.isEmpty).toBe(expectedLength === 0);
    }
}
