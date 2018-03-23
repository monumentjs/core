import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {VersionBuilder} from '../../../../version/main/VersionBuilder';
import {ReleaseStatus} from '../../../../version/main/ReleaseStatus';


@Test()
export class VersionBuilderSpec {

    @Case()
    public 'constructor() creates new instance of VersionBuilder initialized by default version'() {
        let builder: VersionBuilder = new VersionBuilder();

        expect(builder.build().toString()).toBe('0.0.0-alpha');
    }


    @Case()
    public 'constructor() creates new instance of VersionBuilder initialized by custom version'() {
        let builder: VersionBuilder;

        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.ReleaseCandidate, 3);
        expect(builder.build().toString()).toBe('2.2.4-rc.3');

        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.Stable, 3);
        expect(builder.build().toString()).toBe('2.2.4');
    }


    @Case()
    public 'build() creates new version with given major component'() {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.Stable);

        builder.major = 5;

        expect(builder.build().toString()).toBe('5.4.5');
    }


    @Case()
    public 'build() creates new version with given minor component'() {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.Stable);

        builder.minor = 5;

        expect(builder.build().toString()).toBe('3.5.5');
    }


    @Case()
    public 'build() creates new version with given patch component'() {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.Stable);

        builder.patch = 5;

        expect(builder.build().toString()).toBe('3.4.5');
    }


    @Case()
    public 'build() creates new version with given status component'() {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.Beta, 3);

        builder.releaseStatus = ReleaseStatus.ReleaseCandidate;

        expect(builder.build().toString()).toBe('3.4.1-rc.3');
    }


    @Case()
    public 'build() creates new version with given revision component'() {
        let builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.ReleaseCandidate, 1);

        builder.revision = 5;

        expect(builder.build().toString()).toBe('3.4.1-rc.5');
    }
}
