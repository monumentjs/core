import {Dictionary} from '../../../Source/Collections/Dictionary';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';


describe(`Dictionary`, () => {
    let instance: Dictionary<string, string>;


    beforeEach(() => {
        instance = new Dictionary<string, string>([
            {key: 'One', value: 'ONE'},
            {key: 'Two', value: 'TWO'},
            {key: 'three', value: 'Three'},
            {key: 'Three', value: 'THREE'}
        ], IgnoreCaseComparator.instance);
    });


    describe(`#constructor()`, () => {
        it(`throws if 'list' argument is null`, () => {
            expect(() => {
                return new Dictionary(null, IgnoreCaseComparator.instance);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'comparator' argument is null`, () => {
            expect(() => {
                return new Dictionary([], null);
            }).toThrowError(ArgumentNullException);
        });

        it(`creates new instance of Dictionary`, () => {
            expect(instance).toBeInstanceOf(Dictionary);
            expect(instance.length).toBe(3);
            expect(instance.keyComparator).toBe(IgnoreCaseComparator.instance);
            expect(instance.keys.toArray()).toEqual(['One', 'Two', 'Three']);
            expect(instance.values.toArray()).toEqual(['ONE', 'TWO', 'THREE']);
        });
    });


    describe(`#set()`, () => {
        it(`throws if 'key' argument is not defined`, () => {
            expect(() => {
                instance.set(undefined, 'four');
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'key' argument is null`, () => {
            expect(() => {
                instance.set(null, 'four');
            }).toThrowError(ArgumentNullException);
        });

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
        it(`throws if 'key' argument is not defined`, () => {
            expect(() => {
                instance.get(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'key' argument is null`, () => {
            expect(() => {
                instance.get(null);
            }).toThrowError(ArgumentNullException);
        });

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
        it(`throws if 'key' argument is not defined`, () => {
            expect(() => {
                instance.containsKey(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'key' argument is null`, () => {
            expect(() => {
                instance.containsKey(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`determines whether dictionary contains pair with specified key`, () => {
            expect(instance.containsKey('ONE')).toBe(true);
            expect(instance.containsKey('Four')).toBe(false);
        });
    });


    describe(`#containsValue()`, () => {
        it(`does not throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.containsValue(undefined);
            }).not.toThrowError(ArgumentNullException);
        });

        it(`does not throws if 'value' argument is null`, () => {
            expect(() => {
                instance.containsValue(null);
            }).not.toThrowError(ArgumentNullException);
        });

        it(`determines whether dictionary contains pair with specified value`, () => {
            expect(instance.containsValue('ONE')).toBe(true);
            expect(instance.containsValue('Four')).toBe(false);
        });

        it(`uses custom value comparator to determinr whether dictionary contains pair with specified value`, () => {
            expect(instance.containsValue('One')).toBe(false);
            expect(instance.containsValue('One', IgnoreCaseComparator.instance)).toBe(true);
        });
    });


    describe(`#removeByKey()`, () => {
        it(`throws if 'key' argument is not defined`, () => {
            expect(() => {
                instance.removeByKey(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'key' argument is null`, () => {
            expect(() => {
                instance.removeByKey(null);
            }).toThrowError(ArgumentNullException);
        });

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
