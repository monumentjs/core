import {Map} from '../../../Source/Collections/Map';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';


describe(`Map`, () => {
    let map: Map<string, string>;


    beforeEach(() => {
        map = new Map<string, string>(
            [
                {key: 'One', value: 'ONE'},
                {key: 'Two', value: 'TWO'},
                {key: 'three', value: 'Three'},
                {key: 'Three', value: 'THREE'}
            ],
            IgnoreCaseComparator.instance,
            IgnoreCaseComparator.instance
        );
    });


    describe(`constructor()`, () => {
        it(`creates new instance of Map`, () => {
            expect(map).toBeInstanceOf(Map);
            expect(map.length).toBe(3);
            expect(map.keyComparator).toBe(IgnoreCaseComparator.instance);
            expect(map.valueComparator).toBe(IgnoreCaseComparator.instance);
            expect(map.keys.toArray()).toEqual(['One', 'Two', 'Three']);
            expect(map.values.toArray()).toEqual(['ONE', 'TWO', 'THREE']);
        });
    });


    describe(`put()`, () => {
        it(`creates new key-value pair`, () => {
            map.put('four', 'FOUR');
            expect(map.length).toBe(4);
        });

        it(`overwrites key-value pair with same key`, () => {
            map.put('TWO', 'two');
            expect(map.length).toBe(3);
        });
    });


    describe(`get()`, () => {
        it(`returns value with key matching equality comparator`, () => {
            expect(map.get('ONE')).toBe('ONE');
            expect(map.get('TWO')).toBe('TWO');
            expect(map.get('THREE')).toBe('THREE');
        });

        it(`returns fallback value if did not found any`, () => {
            expect(map.get('FOUR', 'FOUR')).toBe('FOUR');
        });
    });


    describe(`containsKey()`, () => {
        it(`determines whether map contains pair with specified key`, () => {
            expect(map.containsKey('ONE')).toBe(true);
            expect(map.containsKey('Four')).toBe(false);
        });
    });


    describe(`containsValue()`, () => {
        it(`determines whether map contains pair with specified value`, () => {
            expect(map.containsValue('ONE')).toBe(true);
            expect(map.containsValue('Four')).toBe(false);
        });
    });


    describe(`remove()`, () => {
        it(`removes key-value pair by key matching equality comparator`, () => {
            expect(map.remove('one')).toBe('ONE');
            expect(map.length).toBe(2);
            expect(map.remove('two')).toBe('TWO');
            expect(map.length).toBe(1);
            expect(map.remove('three')).toBe('THREE');
            expect(map.length).toBe(0);
        });
    });


    describe(`clear()`, () => {
        it(`removes all key-value pairs from map`, () => {
            expect(map.length).toBe(3);

            map.clear();

            expect(map.length).toBe(0);
        });
    });
});
