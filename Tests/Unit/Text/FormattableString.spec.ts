import {FormattableString} from '../../../Source/Text/FormattableString';
import {Map} from '../../../Source/Collections/Map';


describe('FormattableString', () => {
    let instance: FormattableString;

    beforeEach(() => {
        instance = new FormattableString('I like {comicsVendor} comics');
    });


    describe('constructor()', () => {
        it('creates new instance of class', () => {
            expect(instance).toBeInstanceOf(FormattableString);
        });
    });


    describe('extractValues()', () => {
        describe('extracts values from source string', () => {
            it('source string does not contains RegExp symbols', () => {
                let values: Map<string, string> = instance.extractValues(`I like Marvel comics`);

                expect(values.length).toBe(1);
                expect(values.keys.toArray()).toEqual(['comicsVendor']);
                expect(values.values.toArray()).toEqual(['Marvel']);
            });


            it(`source string contains RegExp symbols`, () => {
                let values: Map<string, string>;

                instance = new FormattableString(`1 + (2 * [3 + 4]) = {result}`);

                values = instance.extractValues(`1 + (2 * [3 + 4]) = 15`);

                expect(values.length).toBe(1);
                expect(values.keys.toArray()).toEqual(['result']);
                expect(values.values.toArray()).toEqual(['15']);
            });
        });
    });
});
