import {ReleaseStatus, Version} from '..';

describe('Version', function () {
    it('constructor() creates new instance of Version class / 0 arguments', function () {
        const version: Version = Version.ZERO;

        expect(version.major).toBe(0);
        expect(version.minor).toBe(0);
        expect(version.patch).toBe(0);
        expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
        expect(version.revision).toBe(0);
    });

    it('constructor() creates new instance of Version class / 1 argument', function () {
        const version: Version = new Version(1);

        expect(version.major).toBe(1);
        expect(version.minor).toBe(0);
        expect(version.patch).toBe(0);
        expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
        expect(version.revision).toBe(0);
    });

    it('constructor() creates new instance of Version class / 2 arguments', function () {
        const version: Version = new Version(1, 1);

        expect(version.major).toBe(1);
        expect(version.minor).toBe(1);
        expect(version.patch).toBe(0);
        expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
        expect(version.revision).toBe(0);
    });

    it('constructor() creates new instance of Version class / 3 arguments', function () {
        const version: Version = new Version(1, 1, 1);

        expect(version.major).toBe(1);
        expect(version.minor).toBe(1);
        expect(version.patch).toBe(1);
        expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
        expect(version.revision).toBe(0);
    });

    it('constructor() creates new instance of Version class / 4 arguments', function () {
        const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA);

        expect(version.major).toBe(1);
        expect(version.minor).toBe(1);
        expect(version.patch).toBe(1);
        expect(version.releaseStatus).toBe(ReleaseStatus.BETA);
        expect(version.revision).toBe(0);
    });

    it('constructor() creates new instance of Version class / 5 arguments', function () {
        const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA, 1);

        expect(version.major).toBe(1);
        expect(version.minor).toBe(1);
        expect(version.patch).toBe(1);
        expect(version.releaseStatus).toBe(ReleaseStatus.BETA);
        expect(version.revision).toBe(1);
    });

    it('getNextReleaseStatusVersion() returns version with next release status', function () {
        let originalVersion: Version;
        let nextVersion: Version;

        originalVersion = new Version(1, 2, 3, ReleaseStatus.BETA);
        nextVersion = originalVersion.nextReleaseStatus;

        expect(nextVersion.major).toBe(1);
        expect(nextVersion.minor).toBe(2);
        expect(nextVersion.patch).toBe(3);
        expect(nextVersion.releaseStatus).toBe(ReleaseStatus.RELEASE_CANDIDATE);
        expect(nextVersion.revision).toBe(0);
        expect(nextVersion.toString()).toBe('1.2.3-rc');

        originalVersion = new Version(1, 2, 3, ReleaseStatus.STABLE);
        nextVersion = originalVersion.nextReleaseStatus;

        expect(nextVersion.major).toBe(1);
        expect(nextVersion.minor).toBe(2);
        expect(nextVersion.patch).toBe(3);
        expect(nextVersion.releaseStatus).toBe(ReleaseStatus.STABLE);
        expect(nextVersion.revision).toBe(0);
        expect(nextVersion.toString()).toBe('1.2.3');
    });

    it('toString() stringifies version', function () {
        expect(new Version().toString()).toBe('0.0.0-alpha');
        expect(new Version(1).toString()).toBe('1.0.0-alpha');
        expect(new Version(1, 1).toString()).toBe('1.1.0-alpha');
        expect(new Version(1, 1, 1).toString()).toBe('1.1.1-alpha');

        expect(new Version(1, 1, 1, ReleaseStatus.ALPHA).toString()).toBe('1.1.1-alpha');
        expect(new Version(1, 1, 1, ReleaseStatus.BETA).toString()).toBe('1.1.1-beta');
        expect(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE).toString()).toBe('1.1.1-rc');
        expect(new Version(1, 1, 1, ReleaseStatus.STABLE).toString()).toBe('1.1.1');

        expect(new Version(1, 1, 1, ReleaseStatus.ALPHA, 1).toString()).toBe('1.1.1-alpha.1');
        expect(new Version(1, 1, 1, ReleaseStatus.BETA, 1).toString()).toBe('1.1.1-beta.1');
        expect(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE, 1).toString()).toBe('1.1.1-rc.1');
        expect(new Version(1, 1, 1, ReleaseStatus.STABLE, 1).toString()).toBe('1.1.1');
    });
});
