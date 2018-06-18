import {TestConfiguration} from '@monument/test-drive/main/decorators/TestConfiguration';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {VersionParser} from '@monument/core/main/version/VersionParser';
import {ParsingException} from '@monument/core/main/text/parser/ParsingException';


@TestConfiguration({
    components: [
        VersionParser
    ]
})
export class VersionParserTest {
    private readonly parser: VersionParser;


    public constructor(parser: VersionParser) {
        this.parser = parser;
    }


    @Test
    public 'parse() throws if version is not valid'(assert: Assert) {
        assert.throws(() => {
            this.parser.parse('Broken');
        }, ParsingException);
    }


    @Test
    public 'parse() parses string and return instance of Version class'(assert: Assert) {
        assert.equals(this.parser.parse('1.2.3').toJSON(), '1.2.3');
        assert.equals(this.parser.parse('1.2.3-alpha').toJSON(), '1.2.3-alpha');
        assert.equals(this.parser.parse('1.2.3-beta').toJSON(), '1.2.3-beta');
        assert.equals(this.parser.parse('1.2.3-rc').toJSON(), '1.2.3-rc');
        assert.equals(this.parser.parse('1.2.3-alpha.2').toJSON(), '1.2.3-alpha.2');
        assert.equals(this.parser.parse('1.2.3-beta.2').toJSON(), '1.2.3-beta.2');
        assert.equals(this.parser.parse('1.2.3-rc.2').toJSON(), '1.2.3-rc.2');
    }
}
