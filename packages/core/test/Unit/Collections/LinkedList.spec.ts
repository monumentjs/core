import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { Case } from '../../../../test-drive/Decorators/Case';
import { IgnoreCaseComparator } from '../../../../text/main/IgnoreCaseComparator';
import { LinkedList } from '../../../../collections/main/LinkedList';
import { ListSpec } from './Abstract/ListSpec';


@Test()
export class LinkedListSpec extends ListSpec {


    public create<T>(items?: Iterable<T>): LinkedList<T> {
        return new LinkedList(items);
    }


    @Case()
    public 'equals() compares empty lists'() {
        let list: LinkedList<string> = this.create();

        expect(list.equals(this.create())).toBe(true);
    }


    @Case()
    public 'equals() compares lists using default equality comparator'() {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        expect(list.equals(this.create(['one', 'two', 'three']))).toBe(true);
        expect(list.equals(this.create(['ONE', 'TWO']))).toBe(false);
        expect(list.equals(this.create(['ONE', 'TWO', 'THREE']))).toBe(false);
    }


    @Case()
    public 'equals() compares lists using custom equality comparator'() {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        expect(list.equals(this.create(['one', 'two', 'three']), IgnoreCaseComparator.instance)).toBe(true);
        expect(list.equals(this.create(['ONE', 'TWO']), IgnoreCaseComparator.instance)).toBe(false);
        expect(list.equals(this.create(['ONE', 'TWO', 'THREE']), IgnoreCaseComparator.instance)).toBe(true);
    }


    @Case()
    public 'toJSON() returns pure JS array for JSON serialization'() {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        expect(list.toJSON()).toBeInstanceOf(Array);
        expect(list.toJSON()).toEqual(['one', 'two', 'three']);
    }


    @Case()
    public 'toArray() returns pure JS array'() {
        let list: LinkedList<string> = this.create(['one', 'two', 'three']);

        expect(list.toArray()).toBeInstanceOf(Array);
        expect(list.toArray()).toEqual(['one', 'two', 'three']);
    }
}
