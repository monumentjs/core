import {ReleaseStatus} from '../../../Source/Version/ReleaseStatus';
import {Version} from '../../../Source/Version/Version';


describe('Version', () => {
    let version: Version;


    beforeEach(() => {
        version = new Version();
    });


    describe('constructor()', () => {
        it('creates new instance of Version class / 0 arguments', () => {
            expect(version.major).toBe(0);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.Alpha);
            expect(version.revision).toBe(0);
        });

        it('creates new instance of Version class / 1 argument', () => {
            version = new Version(1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.Alpha);
            expect(version.revision).toBe(0);
        });

        it('creates new instance of Version class / 2 arguments', () => {
            version = new Version(1, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.Alpha);
            expect(version.revision).toBe(0);
        });

        it('creates new instance of Version class / 3 arguments', () => {
            version = new Version(1, 1, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.Alpha);
            expect(version.revision).toBe(0);
        });

        it('creates new instance of Version class / 4 arguments', () => {
            version = new Version(1, 1, 1, ReleaseStatus.Beta);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.Beta);
            expect(version.revision).toBe(0);
        });

        it('creates new instance of Version class / 5 arguments', () => {
            version = new Version(1, 1, 1, ReleaseStatus.Beta, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.Beta);
            expect(version.revision).toBe(1);
        });
    });


    describe('getNextReleaseStatusVersion()', () => {
        it('returns version with next release status', () => {
            let originalVersion: Version;
            let nextVersion: Version;

            originalVersion = new Version(1, 2, 3, ReleaseStatus.Beta);
            nextVersion = originalVersion.getNextReleaseStatusVersion();

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(3);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.ReleaseCandidate);
            expect(nextVersion.revision).toBe(0);
            expect(nextVersion.toString()).toBe('1.2.3-rc');


            originalVersion = new Version(1, 2, 3, ReleaseStatus.Stable);
            nextVersion = originalVersion.getNextReleaseStatusVersion();

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(3);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.Stable);
            expect(nextVersion.revision).toBe(0);
            expect(nextVersion.toString()).toBe('1.2.3');
        });
    });


    describe('toString()', () => {
        it('stringify version', () => {
            expect(new Version().toString()).toBe('0.0.0-alpha');
            expect(new Version(1).toString()).toBe('1.0.0-alpha');
            expect(new Version(1, 1).toString()).toBe('1.1.0-alpha');
            expect(new Version(1, 1, 1).toString()).toBe('1.1.1-alpha');

            expect(new Version(1, 1, 1, ReleaseStatus.Alpha).toString()).toBe('1.1.1-alpha');
            expect(new Version(1, 1, 1, ReleaseStatus.Beta).toString()).toBe('1.1.1-beta');
            expect(new Version(1, 1, 1, ReleaseStatus.ReleaseCandidate).toString()).toBe('1.1.1-rc');
            expect(new Version(1, 1, 1, ReleaseStatus.Stable).toString()).toBe('1.1.1');

            expect(new Version(1, 1, 1, ReleaseStatus.Alpha, 1).toString()).toBe('1.1.1-alpha.1');
            expect(new Version(1, 1, 1, ReleaseStatus.Beta, 1).toString()).toBe('1.1.1-beta.1');
            expect(new Version(1, 1, 1, ReleaseStatus.ReleaseCandidate, 1).toString()).toBe('1.1.1-rc.1');
            expect(new Version(1, 1, 1, ReleaseStatus.Stable, 1).toString()).toBe('1.1.1');
        });
    });
});
