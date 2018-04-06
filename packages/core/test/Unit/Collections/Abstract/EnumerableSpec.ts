import {Case} from '../../../../../test-drive/Decorators/Case';
import {Enumerable} from '../../../../../collections/main/Enumerable';
import {CancellationToken} from '../../../../../async/main/CancellationToken';
import {ArgumentIndexOutOfBoundsException} from '../../../../main/exceptions/ArgumentIndexOutOfBoundsException';
import {InvalidArgumentException} from '../../../../main/exceptions/InvalidArgumentException';
import {RangeException} from '../../../../main/RangeException';


const TEST_ITEMS: string[] = ['one', 'two', 'three'];


export abstract class EnumerableSpec {

    public abstract create<T>(items?: Iterable<T>): Enumerable<T>;


    @Case()
    public 'for...of loop allows iteration'() {
        let instance = this.create(TEST_ITEMS);
        let index: number = 0;

        for (let item of instance) {
            expect(item).toBe(TEST_ITEMS[index]);

            index += 1;
        }

        expect(index).toBe(TEST_ITEMS.length);
    }


    @Case()
    public 'for...of loop can be interrupted'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let index: number = 0;

        for (let name of instance) {
            if (name === 'two') {
                break;
            }

            index += 1;
        }

        expect(index).toEqual(1);
    }


    @Case()
    public 'getIterator() returns iterator object'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator: Iterator<string> = instance.getIterator();

        expect(iterator).toBeDefined();

        for (let index = 0, iteratorResult = iterator.next(); iteratorResult.done === false; iteratorResult = iterator.next(), index++) {
            expect(iteratorResult.value).toBe(TEST_ITEMS[index]);
        }
    }


    @Case()
    public 'getIterator() overwrites default behavior of iteration'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        for (let word of instance) {
            iterator(word);
        }

        expect(iterator).toHaveBeenCalledTimes(3);
        expect(iterator.mock.calls[0]).toEqual(['one']);
        expect(iterator.mock.calls[1]).toEqual(['two']);
        expect(iterator.mock.calls[2]).toEqual(['three']);
    }


    @Case()
    public 'forEach() iterates from start to end'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        instance.forEach(iterator);

        expect(iterator).toHaveBeenCalledTimes(3);

        expect(iterator.mock.calls[0][0]).toBe('one');
        expect(iterator.mock.calls[0][1]).toBe(0);
        expect(iterator.mock.calls[0][2]).toBeInstanceOf(CancellationToken);

        expect(iterator.mock.calls[1][0]).toBe('two');
        expect(iterator.mock.calls[1][1]).toBe(1);
        expect(iterator.mock.calls[1][2]).toBeInstanceOf(CancellationToken);

        expect(iterator.mock.calls[2][0]).toBe('three');
        expect(iterator.mock.calls[2][1]).toBe(2);
        expect(iterator.mock.calls[2][2]).toBeInstanceOf(CancellationToken);
    }


    @Case()
    public 'forEach() iterates through the slice of list'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        instance.forEach(iterator, 0, 2);

        expect(iterator).toHaveBeenCalledTimes(2);

        expect(iterator.mock.calls[0][0]).toBe('one');
        expect(iterator.mock.calls[0][1]).toBe(0);
        expect(iterator.mock.calls[0][2]).toBeInstanceOf(CancellationToken);

        expect(iterator.mock.calls[1][0]).toBe('two');
        expect(iterator.mock.calls[1][1]).toBe(1);
        expect(iterator.mock.calls[1][2]).toBeInstanceOf(CancellationToken);

        iterator = jest.fn();

        instance.forEach(iterator, 1, 2);

        expect(iterator).toHaveBeenCalledTimes(2);

        expect(iterator.mock.calls[0][0]).toBe('two');
        expect(iterator.mock.calls[0][1]).toBe(1);
        expect(iterator.mock.calls[0][2]).toBeInstanceOf(CancellationToken);

        expect(iterator.mock.calls[1][0]).toBe('three');
        expect(iterator.mock.calls[1][1]).toBe(2);
        expect(iterator.mock.calls[1][2]).toBeInstanceOf(CancellationToken);

        iterator = jest.fn();

        instance.forEach(iterator, 1);

        expect(iterator).toHaveBeenCalledTimes(2);

        expect(iterator.mock.calls[0][0]).toBe('two');
        expect(iterator.mock.calls[0][1]).toBe(1);
        expect(iterator.mock.calls[0][2]).toBeInstanceOf(CancellationToken);

        expect(iterator.mock.calls[1][0]).toBe('three');
        expect(iterator.mock.calls[1][1]).toBe(2);
        expect(iterator.mock.calls[1][2]).toBeInstanceOf(CancellationToken);
    }


    @Case()
    public 'forEach() throws if `startIndex` argument is out of bounds'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        expect(() => {
            instance.forEach(iterator, -1);
        }).toThrowError(ArgumentIndexOutOfBoundsException);

        expect(() => {
            instance.forEach(iterator, 3);
        }).toThrowError(ArgumentIndexOutOfBoundsException);
    }


    @Case()
    public 'forEach() throws if `count` argument is not a valid length'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        expect(() => {
            instance.forEach(iterator, 0, -1);
        }).toThrowError(InvalidArgumentException);
    }


    @Case()
    public 'forEach() throws if iteration range is not valid'() {
        let instance: Enumerable<string> = this.create(TEST_ITEMS);
        let iterator = jest.fn();

        expect(() => {
            instance.forEach(iterator, 0, 4);
        }).toThrowError(RangeException);
    }
}
