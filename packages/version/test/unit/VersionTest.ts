import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {ReleaseStatus} from '../../main/ReleaseStatus';
import {Version} from '../../main/Version';


export class VersionTest {

    @Test
    public 'constructor() creates new instance of Version class / 0 arguments'(assert: Assert) {
        const version: Version = Version.ZERO;

        assert.equals(version.major, 0);
        assert.equals(version.minor, 0);
        assert.equals(version.patch, 0);
        assert.equals(version.releaseStatus, ReleaseStatus.ALPHA);
        assert.equals(version.revision, 0);
    }


    @Test
    public 'constructor() creates new instance of Version class / 1 argument'(assert: Assert) {
        const version: Version = new Version(1);

        assert.equals(version.major, 1);
        assert.equals(version.minor, 0);
        assert.equals(version.patch, 0);
        assert.equals(version.releaseStatus, ReleaseStatus.ALPHA);
        assert.equals(version.revision, 0);
    }


    @Test
    public 'constructor() creates new instance of Version class / 2 arguments'(assert: Assert) {
        const version: Version = new Version(1, 1);

        assert.equals(version.major, 1);
        assert.equals(version.minor, 1);
        assert.equals(version.patch, 0);
        assert.equals(version.releaseStatus, ReleaseStatus.ALPHA);
        assert.equals(version.revision, 0);
    }


    @Test
    public 'constructor() creates new instance of Version class / 3 arguments'(assert: Assert) {
        const version: Version = new Version(1, 1, 1);

        assert.equals(version.major, 1);
        assert.equals(version.minor, 1);
        assert.equals(version.patch, 1);
        assert.equals(version.releaseStatus, ReleaseStatus.ALPHA);
        assert.equals(version.revision, 0);
    }


    @Test
    public 'constructor() creates new instance of Version class / 4 arguments'(assert: Assert) {
        const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA);

        assert.equals(version.major, 1);
        assert.equals(version.minor, 1);
        assert.equals(version.patch, 1);
        assert.equals(version.releaseStatus, ReleaseStatus.BETA);
        assert.equals(version.revision, 0);
    }


    @Test
    public 'constructor() creates new instance of Version class / 5 arguments'(assert: Assert) {
        const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA, 1);

        assert.equals(version.major, 1);
        assert.equals(version.minor, 1);
        assert.equals(version.patch, 1);
        assert.equals(version.releaseStatus, ReleaseStatus.BETA);
        assert.equals(version.revision, 1);
    }


    @Test
    public 'getNextReleaseStatusVersion() returns version with next release status'(assert: Assert) {
        let originalVersion: Version;
        let nextVersion: Version;

        originalVersion = new Version(1, 2, 3, ReleaseStatus.BETA);
        nextVersion = originalVersion.getNextReleaseStatusVersion();

        assert.equals(nextVersion.major, 1);
        assert.equals(nextVersion.minor, 2);
        assert.equals(nextVersion.patch, 3);
        assert.equals(nextVersion.releaseStatus, ReleaseStatus.RELEASE_CANDIDATE);
        assert.equals(nextVersion.revision, 0);
        assert.equals(nextVersion.toString(), '1.2.3-rc');

        originalVersion = new Version(1, 2, 3, ReleaseStatus.STABLE);
        nextVersion = originalVersion.getNextReleaseStatusVersion();

        assert.equals(nextVersion.major, 1);
        assert.equals(nextVersion.minor, 2);
        assert.equals(nextVersion.patch, 3);
        assert.equals(nextVersion.releaseStatus, ReleaseStatus.STABLE);
        assert.equals(nextVersion.revision, 0);
        assert.equals(nextVersion.toString(), '1.2.3');
    }


    @Test
    public 'toString() stringifies version'(assert: Assert) {
        assert.equals(new Version().toString(), '0.0.0-alpha');
        assert.equals(new Version(1).toString(), '1.0.0-alpha');
        assert.equals(new Version(1, 1).toString(), '1.1.0-alpha');
        assert.equals(new Version(1, 1, 1).toString(), '1.1.1-alpha');

        assert.equals(new Version(1, 1, 1, ReleaseStatus.ALPHA).toString(), '1.1.1-alpha');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.BETA).toString(), '1.1.1-beta');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE).toString(), '1.1.1-rc');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.STABLE).toString(), '1.1.1');

        assert.equals(new Version(1, 1, 1, ReleaseStatus.ALPHA, 1).toString(), '1.1.1-alpha.1');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.BETA, 1).toString(), '1.1.1-beta.1');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE, 1).toString(), '1.1.1-rc.1');
        assert.equals(new Version(1, 1, 1, ReleaseStatus.STABLE, 1).toString(), '1.1.1');
    }
}
