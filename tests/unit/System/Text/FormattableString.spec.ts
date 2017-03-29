import FormattableString from '../../../../lib/System/Text/FormattableString';


describe('FormattableString', () => {
    let instance: FormattableString = null;

    beforeEach(() => {
        expect(() => {
            instance = new FormattableString('I like {comicsVendor} comics');
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('creates new instance of class', () => {
            expect(instance).toBeInstanceOf(FormattableString);
        });
    });


    describe('#extractValues()', () => {
        describe('extracts values from source string', () => {
            it('source string does not contains RegExp symbols', () => {
                let values: object = null;

                expect(() => {
                    values = instance.extractValues(`I like Marvel comics`);
                }).not.toThrow();

                expect(values).toEqual({
                    comicsVendor: `Marvel`
                });
            });


            it(`source string contains RegExp symbols`, () => {
                let values: object = null;

                instance = new FormattableString(`1 + (2 * [3 + 4]) = {result}`);

                expect(() => {
                    values = instance.extractValues(`1 + (2 * [3 + 4]) = 15`);
                }).not.toThrow();

                expect(values).toEqual({
                    result: `15`
                });
            });
        });
    });
});