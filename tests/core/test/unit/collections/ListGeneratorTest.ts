import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {ListGenerator} from '@monument/core/main/collection/ListGenerator';
import {List} from '@monument/core/main/collection/List';
import {ArgumentRangeException} from '@monument/core/main/exceptions/ArgumentRangeException';
import {RangeException} from '@monument/core/main/exceptions/RangeException';


export class ListGeneratorTest {

    @Test
    public 'repeat() returns new list containing specified amount of generated items'(assert: Assert) {
        let list: List<number> = ListGenerator.repeat(1, 3);

        assert.equals(list.length, 3);
        assert.identical(list.toArray(), [1, 1, 1]);
    }


    @Test
    public 'generate() throws if `length` argument is out of bounds'(assert: Assert) {
        assert.throws(() => {
            ListGenerator.generate(() => 1, -1);
        }, ArgumentRangeException);
    }


    @Test
    public 'generate() returns new list containing specified amount of generated items'(assert: Assert) {
        let numbers = ListGenerator.generate((index: number) => index, 3);

        assert.equals(numbers.length, 3);
        assert.equals(numbers.getAt(0), 0);
        assert.equals(numbers.getAt(1), 1);
        assert.equals(numbers.getAt(2), 2);
    }


    @Test
    public 'range() throws if range bounds are invalid'(assert: Assert) {
        assert.throws(() => {
            ListGenerator.range(0, -1);
        }, RangeException);
    }


    @Test
    public 'range() returns new list containing specified amount of generated items'(assert: Assert) {
        let numbers = ListGenerator.range(0, 3);

        assert.equals(numbers.length, 3);
        assert.equals(numbers.getAt(0), 0);
        assert.equals(numbers.getAt(1), 1);
        assert.equals(numbers.getAt(2), 2);
    }
}
