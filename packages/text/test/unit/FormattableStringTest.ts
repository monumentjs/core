import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Map} from '@monument/collections/main/Map';
import {FormattableString} from '../../main/FormattableString';


export class FormattableStringTest {
    private readonly _comicsVendorTemplate: FormattableString = new FormattableString('I like {comicsVendor} comics');
    private readonly _formulaTemplate: FormattableString = new FormattableString(`1 + (2 * [3 + 4]) = {result}`);


    @Test
    public 'extractValues() extracts values from source string - source string does not contains RegExp symbols'(assert: Assert) {
        let values: Map<string, string> = this._comicsVendorTemplate.extractValues(`I like Marvel comics`);

        assert.equals(values.length, 1);
        assert.identical(values.keys.toArray(), ['comicsVendor']);
        assert.identical(values.values.toArray(), ['Marvel']);
    }


    @Test
    public 'extractValues() extracts values from source string - source string contains RegExp symbols'(assert: Assert) {
        let values: Map<string, string>;

        values = this._formulaTemplate.extractValues(`1 + (2 * [3 + 4]) = 15`);

        assert.equals(values.length, 1);
        assert.identical(values.keys.toArray(), ['result']);
        assert.identical(values.values.toArray(), ['15']);
    }
}
