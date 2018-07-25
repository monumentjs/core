import {EnumerableSpec} from './EnumerableSpec';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Collection} from '@monument/core/main/collection/Collection';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';


export abstract class CollectionSpec extends EnumerableSpec {
    public abstract create<T>(items?: Iterable<T>): Collection<T>;


    @Test
    public 'constructor() without arguments creates empty collection'(assert: Assert) {
        let collection: Collection<string> = this.create();

        this.assertLengthAndIsEmpty(assert, collection, 0);
    }


    @Test
    public 'constructor([items]) creates collection with given items'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two']);

        this.assertLengthAndIsEmpty(assert, collection, 2);
    }


    @Test
    public 'add() adds item into collection'(assert: Assert) {
        let collection: Collection<string> = this.create();

        assert.true(collection.add('value'));

        this.assertLengthAndIsEmpty(assert, collection, 1);

        assert.true(collection.add('value'));

        this.assertLengthAndIsEmpty(assert, collection, 2);
    }


    @Test
    public 'contains() determines whether collection contains specified item'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two']);

        assert.true(collection.contains('one'));
        assert.true(collection.contains('two'));
        assert.false(collection.contains('three'));
    }


    @Test
    public 'contains() determines whether collection contains specified item using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let collection: Collection<string> = this.create(['one', 'two', 'THREE']);

        assert.true(collection.contains('One', comparator));
        assert.true(collection.contains('TWO', comparator));
        assert.true(collection.contains('three', comparator));
    }


    @Test
    public 'remove() returns `false` if collection does not contains the item'(assert: Assert) {
        let collection: Collection<string> = this.create();

        assert.false(collection.remove('itemThatIsNotInCollection'));
    }


    @Test
    public 'remove() returns `true` if item was removed from collection'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two']);

        assert.true(collection.remove('two'));

        this.assertLengthAndIsEmpty(assert, collection, 1);

        assert.true(collection.remove('one'));

        this.assertLengthAndIsEmpty(assert, collection, 0);
    }


    @Test
    public 'removeAll() removes items containing in both lists'(assert: Assert) {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        this.assertLengthAndIsEmpty(assert, collection, 6);

        collection.removeAll(['a', 'b']);

        this.assertLengthAndIsEmpty(assert, collection, 2);

        assert.identical(collection.toArray(), ['c', 'd']);
    }


    @Test
    public 'removeAll() removes items containing in both lists using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        collection.removeAll(['A', 'B']);

        this.assertLengthAndIsEmpty(assert, collection, 6);

        collection.removeAll(['A', 'B'], comparator);

        this.assertLengthAndIsEmpty(assert, collection, 2);

        assert.identical(collection.toArray(), ['c', 'd']);
    }


    @Test
    public 'removeBy() removes items for whose predicate function returns `true`'(assert: Assert) {
        let collection: Collection<string> = this.create(['a', 'b', 'a', 'c', 'd', 'a']);

        collection.removeBy((character: string): boolean => {
            return character === 'a';
        });

        this.assertLengthAndIsEmpty(assert, collection, 3);

        assert.identical(collection.toArray(), ['b', 'c', 'd']);
    }


    @Test
    public 'retainAll() accepts empty lists'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'four', 'five']);

        assert.true(collection.retainAll([]));

        this.assertLengthAndIsEmpty(assert, collection, 0);

        assert.identical(collection.toArray(), []);
    }


    @Test
    public 'retainAll() removes all items except those in specified list'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        assert.true(collection.retainAll(['one', 'Three']));

        this.assertLengthAndIsEmpty(assert, collection, 2);

        assert.identical(collection.toArray(), ['one', 'Three']);
    }


    @Test
    public 'retainAll() uses custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let collection: Collection<string> = this.create(['one', 'two', 'three', 'One', 'Two', 'Three']);

        assert.true(collection.retainAll(['one', 'Three'], comparator));

        this.assertLengthAndIsEmpty(assert, collection, 4);

        assert.identical(collection.toArray(), ['one', 'three', 'One', 'Three']);
    }


    @Test
    public 'clear() clears collection'(assert: Assert) {
        let collection: Collection<string> = this.create(['one', 'two']);

        collection.clear();

        this.assertLengthAndIsEmpty(assert, collection, 0);
    }


    protected assertLengthAndIsEmpty(assert: Assert, items: Collection<string>, expectedLength: number): void {
        assert.equals(items.length, expectedLength);
        assert.equals(items.isEmpty, expectedLength === 0);
    }
}
