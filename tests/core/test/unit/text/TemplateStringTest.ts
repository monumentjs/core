import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {TemplateString} from '@monument/core/main/text/TemplateString';
import {ReadOnlyMap} from 'core/main/collection/readonly/ReadOnlyMap';


export class TemplateStringTest {
    private static readonly MESSAGE_TEMPLATE = 'Hello {0}! Please visit {1} for more details.';
    private static readonly MESSAGE_PARAMETERS = ['User', 'https://github.com/monumentjs/core'];
    private static readonly MESSAGE_TEXT = 'Hello User! Please visit https://github.com/monumentjs/core for more details.';

    private readonly helloTemplate: TemplateString = new TemplateString(TemplateStringTest.MESSAGE_TEMPLATE);

    private readonly _comicsVendorTemplate: TemplateString = new TemplateString('I like {comicsVendor} comics');
    private readonly _formulaTemplate: TemplateString = new TemplateString(`1 + (2 * [3 + 4]) = {result}`);


    @Test
    public 'extractValues() extracts values from source string - source string does not contains RegExp symbols'(assert: Assert) {
        const values: ReadOnlyMap<string, string> = this._comicsVendorTemplate.extractValues(`I like Marvel comics`);

        assert.equals(values.length, 1);
        assert.identical(values.keys.toArray(), ['comicsVendor']);
        assert.identical(values.values.toArray(), ['Marvel']);
    }


    @Test
    public 'extractValues() extracts values from source string - source string contains RegExp symbols'(assert: Assert) {
        const values: ReadOnlyMap<string, string> = this._formulaTemplate.extractValues(`1 + (2 * [3 + 4]) = 15`);

        assert.equals(values.length, 1);
        assert.identical(values.keys.toArray(), ['result']);
        assert.identical(values.values.toArray(), ['15']);
    }


    @Test
    public 'fillByPositions() fills template with real values'(assert: Assert) {
        const text: string = this.helloTemplate.fillByPositions(TemplateStringTest.MESSAGE_PARAMETERS);

        assert.equals(text, TemplateStringTest.MESSAGE_TEXT);
    }
}
