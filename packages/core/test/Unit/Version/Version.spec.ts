import { Case } from '../../../../test-drive/Decorators/Case';
import { BeforeEach } from '@monument/test-drive/decorator/BeforeEach';
import { ReleaseStatus } from '../../../../version/main/ReleaseStatus';
import { Version } from '../../../../version/main/Version';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';


@Test()
export class VersionSpec {
    protected version: Version;


    @BeforeEach()
    public setUpTest() {
        this.version = new Version();
    }


    @Case()
    public 'constructor() creates new instance of Version class / 0 arguments'() {
        expect(this.version.major).toBe(0);
        expect(this.version.minor).toBe(0);
        expect(this.version.patch).toBe(0);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Alpha);
        expect(this.version.revision).toBe(0);
    }


    @Case()
    public 'constructor() creates new instance of Version class / 1 argument'() {
        this.version = new Version(1);

        expect(this.version.major).toBe(1);
        expect(this.version.minor).toBe(0);
        expect(this.version.patch).toBe(0);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Alpha);
        expect(this.version.revision).toBe(0);
    }


    @Case()
    public 'constructor() creates new instance of Version class / 2 arguments'() {
        this.version = new Version(1, 1);

        expect(this.version.major).toBe(1);
        expect(this.version.minor).toBe(1);
        expect(this.version.patch).toBe(0);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Alpha);
        expect(this.version.revision).toBe(0);
    }


    @Case()
    public 'constructor() creates new instance of Version class / 3 arguments'() {
        this.version = new Version(1, 1, 1);

        expect(this.version.major).toBe(1);
        expect(this.version.minor).toBe(1);
        expect(this.version.patch).toBe(1);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Alpha);
        expect(this.version.revision).toBe(0);
    }


    @Case()
    public 'constructor() creates new instance of Version class / 4 arguments'() {
        this.version = new Version(1, 1, 1, ReleaseStatus.Beta);

        expect(this.version.major).toBe(1);
        expect(this.version.minor).toBe(1);
        expect(this.version.patch).toBe(1);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Beta);
        expect(this.version.revision).toBe(0);
    }


    @Case()
    public 'constructor() creates new instance of Version class / 5 arguments'() {
        this.version = new Version(1, 1, 1, ReleaseStatus.Beta, 1);

        expect(this.version.major).toBe(1);
        expect(this.version.minor).toBe(1);
        expect(this.version.patch).toBe(1);
        expect(this.version.releaseStatus).toBe(ReleaseStatus.Beta);
        expect(this.version.revision).toBe(1);
    }


    @Case()
    public 'getNextReleaseStatusVersion() returns version with next release status'() {
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
    }


    @Case()
    public 'toString() stringifies version'() {
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
    }
}
