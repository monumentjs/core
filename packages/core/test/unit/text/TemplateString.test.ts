import { ReadOnlyMap, TemplateString } from '../../..';

describe('TemplateString', function() {
    const MESSAGE_TEMPLATE = 'Hello {0}! Please visit {1} for more details.';
    const MESSAGE_PARAMETERS = ['User', 'https://github.com/monumentjs/core'];
    const MESSAGE_TEXT = 'Hello User! Please visit https://github.com/monumentjs/core for more details.';

    const HELLO_TEMPLATE: TemplateString = new TemplateString(MESSAGE_TEMPLATE);
    const COMICS_VENDOR_TEMPLATE: TemplateString = new TemplateString('I like {comicsVendor} comics');
    const FORMULA_TEMPLATE: TemplateString = new TemplateString(`1 + (2 * [3 + 4]) = {result}`);

    it('extractValues() extracts values from source string - source string does not contains RegExp symbols', function() {
        const values: ReadOnlyMap<string, string> = COMICS_VENDOR_TEMPLATE.extractValues(`I like Marvel comics`);

        expect(values.length).toBe(1);
        expect([...values.keys]).toEqual(['comicsVendor']);
        expect([...values.values]).toEqual(['Marvel']);
    });

    it('extractValues() extracts values from source string - source string contains RegExp symbols', function() {
        const values: ReadOnlyMap<string, string> = FORMULA_TEMPLATE.extractValues(`1 + (2 * [3 + 4]) = 15`);

        expect(values.length).toBe(1);
        expect([...values.keys]).toEqual(['result']);
        expect([...values.values]).toEqual(['15']);
    });

    it('fillByPositions() fills template with real values', function() {
        const text: string = HELLO_TEMPLATE.fillByPositions(MESSAGE_PARAMETERS);

        expect(text).toBe(MESSAGE_TEXT);
    });
});
