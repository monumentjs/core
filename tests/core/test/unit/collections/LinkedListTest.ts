import {ListSpec} from './ListSpec';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {ContextConfiguration} from '@monument/test-drive/main/decorators/ContextConfiguration';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {LinkedList} from '@monument/core/main/collections/LinkedList';


@ContextConfiguration({
    components: [
        IgnoreCaseComparator
    ]
})
export class LinkedListTest extends ListSpec {

    public create<T>(items?: Iterable<T>): LinkedList<T> {
        return new LinkedList(items);
    }


    @Test
    public 'equals() compares empty lists'(assert: Assert) {
        let list: LinkedList<string> = this.create();

        assert.true(list.equals(this.create()));
    }


    @Test
    public 'equals() compares lists using default equality comparator'(assert: Assert) {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        assert.true(list.equals(this.create(['one', 'two', 'three'])));
        assert.false(list.equals(this.create(['ONE', 'TWO'])));
        assert.false(list.equals(this.create(['ONE', 'TWO', 'THREE'])));
    }


    @Test
    public 'equals() compares lists using custom equality comparator'(assert: Assert, comparator: IgnoreCaseComparator) {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        assert.true(list.equals(this.create(['one', 'two', 'three']), comparator));
        assert.false(list.equals(this.create(['ONE', 'TWO']), comparator));
        assert.true(list.equals(this.create(['ONE', 'TWO', 'THREE']), comparator));
    }


    @Test
    public 'toJSON() returns pure JS array for JSON serialization'(assert: Assert) {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.toJSON(), ['one', 'two', 'three']);
    }


    @Test
    public 'toArray() returns pure JS array'(assert: Assert) {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        assert.identical(list.toArray(), ['one', 'two', 'three']);
    }
}
