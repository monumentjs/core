import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {VersionBuilder} from '@monument/core/main/version/VersionBuilder';
import {ReleaseStatus} from '@monument/core/main/version/ReleaseStatus';


export class VersionBuilderTest {

    @Test
    public 'constructor() creates new instance of VersionBuilder initialized by default version'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder();

        assert.equals(builder.build().toString(), '0.0.0-alpha');
    }


    @Test
    public 'constructor() creates new instance of VersionBuilder initialized by custom version'(assert: Assert) {
        let builder: VersionBuilder;

        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.RELEASE_CANDIDATE, 3);
        assert.equals(builder.build().toString(), '2.2.4-rc.3');

        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.STABLE, 3);
        assert.equals(builder.build().toString(), '2.2.4');
    }


    @Test
    public 'build() creates new version with given major component'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.STABLE);

        builder.major = 5;

        assert.equals(builder.build().toString(), '5.4.5');
    }


    @Test
    public 'build() creates new version with given minor component'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.STABLE);

        builder.minor = 5;

        assert.equals(builder.build().toString(), '3.5.5');
    }


    @Test
    public 'build() creates new version with given patch component'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.STABLE);

        builder.patch = 5;

        assert.equals(builder.build().toString(), '3.4.5');
    }


    @Test
    public 'build() creates new version with given status component'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.BETA, 3);

        builder.releaseStatus = ReleaseStatus.RELEASE_CANDIDATE;

        assert.equals(builder.build().toString(), '3.4.1-rc.3');
    }


    @Test
    public 'build() creates new version with given revision component'(assert: Assert) {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.RELEASE_CANDIDATE, 1);

        builder.revision = 5;

        assert.equals(builder.build().toString(), '3.4.1-rc.5');
    }
}
