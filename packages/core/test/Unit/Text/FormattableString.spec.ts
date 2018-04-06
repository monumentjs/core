import { Case } from '../../../../test-drive/Decorators/Case';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { FormattableString } from '../../../../text/main/FormattableString';
import { Map } from '../../../../collections/main/Map';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';


@Test()
export class FormattableStringSpec {
    protected instance: FormattableString;


    @BeforeEach()
    public setUpTest() {
        this.instance = new FormattableString('I like {comicsVendor} comics');
    }


    @Case()
    public 'constructor() creates new instance of class'() {
        expect(this.instance).toBeInstanceOf(FormattableString);
    }


    public 'extractValues() extracts values from source string - source string does not contains RegExp symbols'() {
        let values: Map<string, string> = this.instance.extractValues(`I like Marvel comics`);

        expect(values.length).toBe(1);
        expect(values.keys.toArray()).toEqual(['comicsVendor']);
        expect(values.values.toArray()).toEqual(['Marvel']);
    }


    public 'extractValues() extracts values from source string - source string contains RegExp symbols'() {
        let values: Map<string, string>;

        this.instance = new FormattableString(`1 + (2 * [3 + 4]) = {result}`);

        values = this.instance.extractValues(`1 + (2 * [3 + 4]) = 15`);

        expect(values.length).toBe(1);
        expect(values.keys.toArray()).toEqual(['result']);
        expect(values.values.toArray()).toEqual(['15']);
    }
}
