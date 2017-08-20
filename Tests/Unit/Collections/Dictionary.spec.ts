import {Dictionary} from '../../../Source/Collections/Dictionary';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {Container} from '../../../Source/DI/Container/Container';


describe(`Dictionary`, () => {
    const comparator: IgnoreCaseComparator = Container.get(IgnoreCaseComparator);

    let instance: Dictionary<string, string>;


    beforeEach(() => {
        instance = new Dictionary<string, string>([
            {key: 'One', value: 'ONE'},
            {key: 'Two', value: 'TWO'},
            {key: 'three', value: 'Three'},
            {key: 'Three', value: 'THREE'}
        ], comparator);
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of Dictionary`, () => {
            expect(instance).toBeInstanceOf(Dictionary);
            expect(instance.length).toBe(3);
            expect(instance.keyComparator).toBe(comparator);
            expect(instance.keys.toArray()).toEqual(['One', 'Two', 'Three']);
            expect(instance.values.toArray()).toEqual(['ONE', 'TWO', 'THREE']);
        });
    });


    describe(`#set()`, () => {
        it(`creates new key-value pair`, () => {
            instance.set('four', 'FOUR');
            expect(instance.length).toBe(4);
            expect(instance[3].key).toBe('four');
            expect(instance[3].value).toBe('FOUR');
        });

        it(`overwrites key-value pair with same key`, () => {
            instance.set('TWO', 'two');
            expect(instance.length).toBe(3);
            expect(instance[2].key).toBe('TWO');
            expect(instance[2].value).toBe('two');
        });
    });


    describe(`#set()`, () => {
        it(`returns value with key matching equality comparator`, () => {
            expect(instance.get('ONE')).toBe('ONE');
            expect(instance.get('TWO')).toBe('TWO');
            expect(instance.get('THREE')).toBe('THREE');
        });

        it(`returns fallback value if did not found any`, () => {
            expect(instance.get('FOUR', 'FOUR')).toBe('FOUR');
        });
    });


    describe(`#containsKey()`, () => {
        it(`determines whether dictionary contains pair with specified key`, () => {
            expect(instance.containsKey('ONE')).toBe(true);
            expect(instance.containsKey('Four')).toBe(false);
        });
    });


    describe(`#containsValue()`, () => {
        it(`determines whether dictionary contains pair with specified value`, () => {
            expect(instance.containsValue('ONE')).toBe(true);
            expect(instance.containsValue('Four')).toBe(false);
        });

        it(`uses custom value comparator to determinr whether dictionary contains pair with specified value`, () => {
            expect(instance.containsValue('One')).toBe(false);
            expect(instance.containsValue('One', comparator)).toBe(true);
        });
    });


    describe(`#removeByKey()`, () => {
        it(`removes key-value pair by key matching equality comparator`, () => {
            expect(instance.removeByKey('one')).toBe(true);
            expect(instance.length).toBe(2);
            expect(instance.removeByKey('two')).toBe(true);
            expect(instance.length).toBe(1);
            expect(instance.removeByKey('three')).toBe(true);
            expect(instance.length).toBe(0);
        });
    });


    describe(`#clear()`, () => {
        it(`removes all key-value pairs from dictionary`, () => {
            expect(instance.length).toBe(3);

            instance.clear();

            expect(instance.length).toBe(0);
            expect(instance[0]).toBe(undefined);
            expect(instance[1]).toBe(undefined);
            expect(instance[2]).toBe(undefined);
        });
    });
});
