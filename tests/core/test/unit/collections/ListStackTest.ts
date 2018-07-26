import {ListStack} from 'core/main/collection/mutable/ListStack';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {ContextConfiguration} from '@monument/test-drive/main/decorators/ContextConfiguration';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {StackSpec} from './StackSpec';


@ContextConfiguration({
    components: [
        IgnoreCaseComparator
    ]
})
export class ListStackTest extends StackSpec {

    public create<T>(items?: Iterable<T>): ListStack<T> {
        return new ListStack(items);
    }


    @Test
    public 'equals() compares empty stacks'(assert: Assert) {
        const list: ListStack<string> = this.create();

        assert.true(list.equals(this.create()));
    }


    @Test
    public 'equals() compares lists'(assert: Assert) {
        const list: ListStack<string> = this.create(['one', 'two', 'three']);

        assert.true(list.equals(this.create(['one', 'two', 'three'])));
        assert.false(list.equals(this.create(['ONE', 'TWO'])));
        assert.false(list.equals(this.create(['ONE', 'TWO', 'THREE'])));
    }


    @Test
    public 'toJSON() returns pure JS array for JSON serialization'(assert: Assert) {
        const list: ListStack<string> = this.create(['one', 'two', 'three']);

        assert.true(list.toJSON() instanceof Array);
        assert.identical(list.toJSON(), ['one', 'two', 'three']);
    }


    @Test
    public 'toArray() returns pure JS array'(assert: Assert) {
        const list: ListStack<string> = this.create(['one', 'two', 'three']);

        assert.true(list.toArray() instanceof Array);
        assert.identical(list.toArray(), ['one', 'two', 'three']);
    }
}
