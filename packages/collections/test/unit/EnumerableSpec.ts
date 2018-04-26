import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {MockFactory} from '@monument/test-drive/main/mock/MockFactory';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {InvalidArgumentException} from '@monument/core/main/exceptions/InvalidArgumentException';
import {RangeException} from '@monument/core/main/exceptions/RangeException';
import {Enumerable} from '../../main/Enumerable';
import {IteratorFunction} from '../../main/IteratorFunction';


const TEST_ITEMS: string[] = ['one', 'two', 'three'];


export abstract class EnumerableSpec {

    public abstract create<T>(items?: Iterable<T>): Enumerable<T>;


    @Test
    public 'for...of loop allows iteration'(assert: Assert) {
        let instance = this.create(TEST_ITEMS);
        let index: number = 0;

        for (let item of instance) {
            assert.equals(item, TEST_ITEMS[index]);

            index += 1;
        }

        assert.equals(index, TEST_ITEMS.length);
    }


    @Test
    public 'for...of loop can be interrupted'(assert: Assert) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let index: number = 0;

        for (let name of instance) {
            if (name === 'two') {
                break;
            }

            index += 1;
        }

        assert.equals(index, 1);
    }


    @Test
    public '.iterator returns iterator object'(assert: Assert) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator: Iterator<string> = instance.iterator;

        assert.true(iterator != null);

        for (let index = 0, iteratorResult = iterator.next(); iteratorResult.done === false; iteratorResult = iterator.next(), index++) {
            assert.equals(iteratorResult.value, TEST_ITEMS[index]);
        }
    }


    @Test
    public '.iterator overwrites default behavior of iteration'(assert: Assert, mockFactory: MockFactory) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock: FunctionMock = mockFactory.function();

        for (let word of instance) {
            mock.value(word);
        }

        assert.equals(mock.callsCount, TEST_ITEMS.length);
        assert.true(mock.testCallArguments(0, ['one']));
        assert.true(mock.testCallArguments(1, ['two']));
        assert.true(mock.testCallArguments(2, ['three']));
    }


    @Test
    public 'forEach() iterates from start to end'(assert: Assert, mockFactory: MockFactory) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        instance.forEach(mock.value);

        assert.equals(mock.callsCount, 3);

        assert.true(mock.testCallArguments(0, ['one', 0]));
        assert.true(mock.testCallArguments(1, ['two', 1]));
        assert.true(mock.testCallArguments(2, ['three', 2]));
    }


    @Test
    public 'forEach() iterates through the slice of list - starts from first element'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        instance.forEach(mock.value, 0, 2);

        assert.equals(mock.callsCount, 2);

        assert.true(mock.testCallArguments(0, ['one', 0]));
        assert.true(mock.testCallArguments(1, ['two', 1]));
    }


    @Test
    public 'forEach() iterates through the slice of list - starts from middle element'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        instance.forEach(mock.value, 1, 2);

        assert.equals(mock.callsCount, 2);

        assert.true(mock.testCallArguments(0, ['two', 1]));
        assert.true(mock.testCallArguments(1, ['three', 2]));
    }

    @Test
    public 'forEach() iterates through the slice of list - end index not specified'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        instance.forEach(mock.value, 1);

        assert.equals(mock.callsCount, 2);

        assert.true(mock.testCallArguments(0, ['two', 1]));
        assert.true(mock.testCallArguments(1, ['three', 2]));
    }


    @Test
    public 'forEach() throws if `startIndex` argument is out of bounds'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        assert.throws(() => {
            instance.forEach(mock.value, -1);
        }, ArgumentIndexOutOfBoundsException);

        assert.throws(() => {
            instance.forEach(mock.value, 3);
        }, ArgumentIndexOutOfBoundsException);
    }


    @Test
    public 'forEach() throws if `count` argument is not a valid length'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        assert.throws(() => {
            instance.forEach(mock.value, 0, -1);
        }, InvalidArgumentException);
    }


    @Test
    public 'forEach() throws if iteration range is not valid'(
        assert: Assert,
        mockFactory: MockFactory
    ) {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let mock = mockFactory.function<IteratorFunction<string, void>>();

        assert.throws(() => {
            instance.forEach(mock.value, 0, 4);
        }, RangeException);

        assert.equals(mock.callsCount, 0);
    }
}
