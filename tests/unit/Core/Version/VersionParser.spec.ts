import {VersionParser} from '../../../../src/Core/Version/VersionParser';
import {Version} from '../../../../src/Core/Version/Version';
import {ParsingException} from '../../../../src/Core/Text/Parsing/ParsingException';


describe(`VersionParser`, () => {
    let instance: VersionParser;


    beforeEach(() => {
        instance = new VersionParser();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of VersionParser`, () => {
            expect(instance).toBeInstanceOf(VersionParser);
        });
    });


    describe('#parse()', () => {
        it(`throws if version is not valid`, () => {
            expect(() => {
                instance.parse('Broken');
            }).toThrowError(ParsingException);
        });

        it('parses string and return instance of Version class', () => {
            expect(instance.parse('1.2.3')).toBeInstanceOf(Version);
            expect(instance.parse('1.2.3').toJSON()).toEqual('1.2.3');
            expect(instance.parse('1.2.3-alpha').toJSON()).toEqual('1.2.3-alpha');
            expect(instance.parse('1.2.3-beta').toJSON()).toEqual('1.2.3-beta');
            expect(instance.parse('1.2.3-rc').toJSON()).toEqual('1.2.3-rc');
            expect(instance.parse('1.2.3-alpha.2').toJSON()).toEqual('1.2.3-alpha.2');
            expect(instance.parse('1.2.3-beta.2').toJSON()).toEqual('1.2.3-beta.2');
            expect(instance.parse('1.2.3-rc.2').toJSON()).toEqual('1.2.3-rc.2');
        });
    });
});