import {Test} from '@monument/test-drive/Decorators/TestConfiguration';
import {Case} from '@monument/test-drive/Decorators/Case';
import {IgnoreCaseComparator} from '@monument/text/main/IgnoreCaseComparator';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ListSpec} from './Abstract/ListSpec';


@Test()
export class ArrayListSpec extends ListSpec {

    public create<T>(items?: Iterable<T>): ArrayList<T> {
        return new ArrayList(items);
    }


    @Case()
    public 'equals() compares empty lists'() {
        let list: ArrayList<string> = this.create();

        expect(list.equals(this.create())).toBe(true);
    }


    @Case()
    public 'equals() compares lists using default equality comparator'() {
        let list: ArrayList<string> = this.create(['one', 'two', 'three']);

        expect(list.equals(this.create(['one', 'two', 'three']))).toBe(true);
        expect(list.equals(this.create(['ONE', 'TWO']))).toBe(false);
        expect(list.equals(this.create(['ONE', 'TWO', 'THREE']))).toBe(false);
    }


    @Case()
    public 'equals() compares lists using custom equality comparator'() {
        let list: ArrayList<string> = this.create(['one', 'two', 'three']);

        expect(list.equals(this.create(['one', 'two', 'three']), IgnoreCaseComparator.instance)).toBe(true);
        expect(list.equals(this.create(['ONE', 'TWO']), IgnoreCaseComparator.instance)).toBe(false);
        expect(list.equals(this.create(['ONE', 'TWO', 'THREE']), IgnoreCaseComparator.instance)).toBe(true);
    }


    @Case()
    public 'toJSON() returns pure JS array for JSON serialization'() {

        let list: ArrayList<string> = this.create(['one', 'two', 'three']);

        expect(list.toJSON()).toBeInstanceOf(Array);
        expect(list.toJSON()).toEqual(['one', 'two', 'three']);
    }


    @Case()
    public 'toArray() returns pure JS array'() {
        let list: ArrayList<string> = this.create(['one', 'two', 'three']);

        expect(list.toArray()).toBeInstanceOf(Array);
        expect(list.toArray()).toEqual(['one', 'two', 'three']);
    }
}
