import { Case } from '../../../../../test-drive/decorator/Case';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';
import { EqualityComparator } from '../../../../main/EqualityComparator';
import { IgnoreCaseComparator } from '../../../../../text/main/IgnoreCaseComparator';
import { Map } from '../../../../../collections/main/Map';
import { KeyValuePair } from '../../../../../collections/main/KeyValuePair';


export abstract class MapSpec {
    private map: Map<string, string>;


    public abstract create(
        items?: Iterable<KeyValuePair<string, string>>,
        keyComparator?: EqualityComparator<string>,
        valueComparator?: EqualityComparator<string>
    ): Map<string, string>;


    @BeforeEach()
    public setUpTest() {
        this.map = this.create(
            [
                new KeyValuePair('One', 'ONE'),
                new KeyValuePair('Two', 'TWO'),
                new KeyValuePair('three', 'Three'),
                new KeyValuePair('Three', 'THREE')
            ],
            IgnoreCaseComparator.instance,
            IgnoreCaseComparator.instance
        );
    }


    @Case()
    public 'constructor() creates new instance of Map'() {
        expect(this.map.length).toBe(3);
        expect(this.map.keyComparator).toBe(IgnoreCaseComparator.instance);
        expect(this.map.valueComparator).toBe(IgnoreCaseComparator.instance);
        expect(this.map.keys.toArray()).toEqual(['One', 'Two', 'Three']);
        expect(this.map.values.toArray()).toEqual(['ONE', 'TWO', 'THREE']);
    }


    @Case()
    public 'put() creates new key-value pair'() {
        this.map.put('four', 'FOUR');

        expect(this.map.length).toBe(4);
    }


    @Case()
    public 'put() overwrites key-value pair with same key'() {
        this.map.put('TWO', 'two');

        expect(this.map.length).toBe(3);
    }


    @Case()
    public 'get() returns value with key matching equality comparator'() {
        expect(this.map.get('ONE')).toBe('ONE');
        expect(this.map.get('TWO')).toBe('TWO');
        expect(this.map.get('THREE')).toBe('THREE');
    }


    @Case()
    public 'get() returns fallback value if did not found any'() {
        expect(this.map.get('FOUR', 'FOUR')).toBe('FOUR');
    }


    @Case()
    public 'containsKey() determines whether map contains pair with specified key'() {
        expect(this.map.containsKey('ONE')).toBe(true);
        expect(this.map.containsKey('Four')).toBe(false);
    }


    @Case()
    public 'containsValue() determines whether map contains pair with specified value'() {
        expect(this.map.containsValue('ONE')).toBe(true);
        expect(this.map.containsValue('Four')).toBe(false);
    }


    @Case()
    public 'remove() removes key-value pair by key matching equality comparator'() {
        expect(this.map.remove('one')).toBe('ONE');
        expect(this.map.length).toBe(2);
        expect(this.map.remove('two')).toBe('TWO');
        expect(this.map.length).toBe(1);
        expect(this.map.remove('three')).toBe('THREE');
        expect(this.map.length).toBe(0);
    }


    @Case()
    public 'clear() removes all key-value pairs from map'() {
        expect(this.map.length).toBe(3);

        this.map.clear();

        expect(this.map.length).toBe(0);
    }
}
