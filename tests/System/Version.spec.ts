import Version from '../../lib/System/Version';
import {ReleaseStatus} from '../../lib/System/types';


describe('Version', () => {
    describe('#constructor()', () => {
        it('should create new instance of Version class', () => {
            let version: Version = null;

            expect(function () {
                version = new Version();
            }).not.toThrow();

            expect(version.major).toEqual(0);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Stable);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Stable);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Stable);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Stable);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1, ReleaseStatus.Alpha);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);

            expect(function () {
                version = new Version(1, 1, 1, ReleaseStatus.Alpha, 1);
            }).not.toThrow();

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(1);
        });
    });


    // TODO: test getters / setters


    describe('#toString()', () => {
        it('should stringify version', () => {
            expect(new Version().toString()).toEqual('0.0.0');
            expect(new Version(1).toString()).toEqual('1.0.0');
            expect(new Version(1, 1).toString()).toEqual('1.1.0');
            expect(new Version(1, 1, 1).toString()).toEqual('1.1.1');

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
        it('should parse string and return instance of Version class', () => {
            expect(Version.parse('1.2.3').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.Stable,
                revision: 0
            });

            expect(Version.parse('1.2.3-alpha').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.Alpha,
                revision: 0
            });

            expect(Version.parse('1.2.3-beta').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.Beta,
                revision: 0
            });

            expect(Version.parse('1.2.3-rc').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.ReleaseCandidate,
                revision: 0
            });

            expect(Version.parse('1.2.3-alpha.2').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.Alpha,
                revision: 2
            });

            expect(Version.parse('1.2.3-beta.2').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.Beta,
                revision: 2
            });

            expect(Version.parse('1.2.3-rc.2').toJSON()).toEqual({
                major: 1,
                minor: 2,
                patch: 3,
                status: ReleaseStatus.ReleaseCandidate,
                revision: 2
            });
        });
    });
});