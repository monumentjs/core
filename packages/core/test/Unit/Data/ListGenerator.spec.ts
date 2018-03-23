import { Case } from '../../../../test-drive/decorator/Case';
import { ListGenerator } from './../../../Data/Generation/ListGenerator';
import { List } from '../../../../collections-core/main/List';
import { RangeException } from '../../../main/RangeException';
import { ArgumentRangeException } from '../../../main/exceptions/ArgumentRangeException';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';


@Test()
export class ListGeneratorSpec {

    @Case()
    public 'repeat() returns new list containing specified amount of generated items'() {
        let list: List<number> = ListGenerator.repeat(1, 3);

        expect(list.length).toBe(3);
        expect(list.toArray()).toEqual([1, 1, 1]);
    }


    @Case()
    public 'generate() throws if `length` argument is out of bounds'() {
        expect(() => {
            ListGenerator.generate(() => 1, -1);
        }).toThrowError(ArgumentRangeException);
    }


    @Case()
    public 'generate() returns new list containing specified amount of generated items'() {
        let numbers = ListGenerator.generate((index: number) => index, 3);

        expect(numbers.length).toBe(3);
        expect(numbers.getAt(0)).toBe(0);
        expect(numbers.getAt(1)).toBe(1);
        expect(numbers.getAt(2)).toBe(2);
    }


    @Case()
    public 'range() throws if range bounds are invalid'() {
        expect(() => {
            ListGenerator.range(0, -1);
        }).toThrowError(RangeException);
    }


    @Case()
    public 'range() returns new list containing specified amount of generated items'() {
        let numbers = ListGenerator.range(0, 3);

        expect(numbers.length).toBe(3);
        expect(numbers.getAt(0)).toBe(0);
        expect(numbers.getAt(1)).toBe(1);
        expect(numbers.getAt(2)).toBe(2);
    }
}
