import {Version} from '../../../../version/main/Version';
import {VersionParser} from '../../../../version/main/VersionParser';
import {ParsingException} from '../../../../text-parser-core/main/ParsingException';
import {Case} from '../../../../test-drive/Decorators/Case';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';


@Test()
export class VersionParserSpec {
    protected readonly parser: VersionParser = VersionParser.instance;


    @Case()
    public 'constructor() creates new instance of VersionParser'() {
        expect(this.parser).toBeInstanceOf(VersionParser);
    }


    @Case()
    public 'parse() throws if version is not valid'() {
        expect(() => {
            this.parser.parse('Broken');
        }).toThrowError(ParsingException);
    }


    @Case()
    public 'parse() parses string and return instance of Version class'() {
        expect(this.parser.parse('1.2.3')).toBeInstanceOf(Version);
        expect(this.parser.parse('1.2.3').toJSON()).toEqual('1.2.3');
        expect(this.parser.parse('1.2.3-alpha').toJSON()).toEqual('1.2.3-alpha');
        expect(this.parser.parse('1.2.3-beta').toJSON()).toEqual('1.2.3-beta');
        expect(this.parser.parse('1.2.3-rc').toJSON()).toEqual('1.2.3-rc');
        expect(this.parser.parse('1.2.3-alpha.2').toJSON()).toEqual('1.2.3-alpha.2');
        expect(this.parser.parse('1.2.3-beta.2').toJSON()).toEqual('1.2.3-beta.2');
        expect(this.parser.parse('1.2.3-rc.2').toJSON()).toEqual('1.2.3-rc.2');
    }
}
