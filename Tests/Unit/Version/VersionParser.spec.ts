import {VersionParser} from '../../../Source/Version/VersionParser';
import {Version} from '../../../Source/Version/Version';
import {ParsingException} from '../../../Source/Text/Parsing/ParsingException';


describe(`VersionParser`, () => {
    const parser: VersionParser = VersionParser.instance;


    describe(`constructor()`, () => {
        it(`creates new instance of VersionParser`, () => {
            expect(parser).toBeInstanceOf(VersionParser);
        });
    });


    describe('parse()', () => {
        it(`throws if version is not valid`, () => {
            expect(() => {
                parser.parse('Broken');
            }).toThrowError(ParsingException);
        });

        it('parses string and return instance of Version class', () => {
            expect(parser.parse('1.2.3')).toBeInstanceOf(Version);
            expect(parser.parse('1.2.3').toJSON()).toEqual('1.2.3');
            expect(parser.parse('1.2.3-alpha').toJSON()).toEqual('1.2.3-alpha');
            expect(parser.parse('1.2.3-beta').toJSON()).toEqual('1.2.3-beta');
            expect(parser.parse('1.2.3-rc').toJSON()).toEqual('1.2.3-rc');
            expect(parser.parse('1.2.3-alpha.2').toJSON()).toEqual('1.2.3-alpha.2');
            expect(parser.parse('1.2.3-beta.2').toJSON()).toEqual('1.2.3-beta.2');
            expect(parser.parse('1.2.3-rc.2').toJSON()).toEqual('1.2.3-rc.2');
        });
    });
});
