import {ReleaseStatus} from '../../lib/System/types';
import Version from '../../lib/System/Version';
import VersionParser from '../../lib/System/VersionParser';


describe('Version', () => {
    describe('#constructor()', () => {
        
        // TODO: split into test cases for different constructor overloads
        
        it('creates new instance of Version class', () => {
            let version: Version = null;

            expect(function () {
                version = new Version();
            }).not.toThrow();

            expect(version.major).toEqual(0);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1, ReleaseStatus.Beta);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Beta);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1, ReleaseStatus.Beta, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Beta);
            expect(version.revision).toEqual(1);
        });
    });


    // TODO: test getters / setters


    describe('#toString()', () => {
        it('stringify version', () => {
            expect(new Version().toString()).toEqual('0.0.0-alpha');
            expect(new Version(1).toString()).toEqual('1.0.0-alpha');
            expect(new Version(1, 1).toString()).toEqual('1.1.0-alpha');
            expect(new Version(1, 1, 1).toString()).toEqual('1.1.1-alpha');

            expect(new Version(1, 1, 1, ReleaseStatus.Alpha).toString()).toEqual('1.1.1-alpha');
            expect(new Version(1, 1, 1, ReleaseStatus.Beta).toString()).toEqual('1.1.1-beta');
            expect(new Version(1, 1, 1, ReleaseStatus.ReleaseCandidate).toString()).toEqual('1.1.1-rc');
            expect(new Version(1, 1, 1, ReleaseStatus.Stable).toString()).toEqual('1.1.1');

            expect(new Version(1, 1, 1, ReleaseStatus.Alpha, 1).toString()).toEqual('1.1.1-alpha.1');
            expect(new Version(1, 1, 1, ReleaseStatus.Beta, 1).toString()).toEqual('1.1.1-beta.1');
            expect(new Version(1, 1, 1, ReleaseStatus.ReleaseCandidate, 1).toString()).toEqual('1.1.1-rc.1');
            expect(new Version(1, 1, 1, ReleaseStatus.Stable, 1).toString()).toEqual('1.1.1');
        });
    });


    describe('#parse()', () => {
        let versionParser: VersionParser = null;
        
        beforeEach(() => {
            versionParser = new VersionParser();
        });
        
        
        it('parse string and return instance of Version class', () => {
            // TODO: Version class is just a data structure, this test cases MUST be moved to VersionParser test suite
            expect(versionParser.parse('1.2.3').toJSON()).toEqual('1.2.3');
            expect(versionParser.parse('1.2.3-alpha').toJSON()).toEqual('1.2.3-alpha');
            expect(versionParser.parse('1.2.3-beta').toJSON()).toEqual('1.2.3-beta');
            expect(versionParser.parse('1.2.3-rc').toJSON()).toEqual('1.2.3-rc');
            expect(versionParser.parse('1.2.3-alpha.2').toJSON()).toEqual('1.2.3-alpha.2');
            expect(versionParser.parse('1.2.3-beta.2').toJSON()).toEqual('1.2.3-beta.2');
            expect(versionParser.parse('1.2.3-rc.2').toJSON()).toEqual('1.2.3-rc.2');
        });
    });
});