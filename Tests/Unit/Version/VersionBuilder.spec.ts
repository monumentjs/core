import {VersionBuilder} from '../../../Source/Version/VersionBuilder';
import {ReleaseStatus} from '../../../Source/Version/ReleaseStatus';


describe(`VersionBuilder`, () => {
    let builder: VersionBuilder;


    it(`creates new instance of VersionBuilder initialized by default version`, () => {
        builder = new VersionBuilder();
        expect(builder.getValue().toString()).toBe('0.0.0-alpha');
    });


    it(`creates new instance of VersionBuilder initialized by custom version`, () => {
        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.ReleaseCandidate, 3);
        expect(builder.getValue().toString()).toBe('2.2.4-rc.3');

        builder = new VersionBuilder(2, 2, 4, ReleaseStatus.Stable, 3);
        expect(builder.getValue().toString()).toBe('2.2.4');
    });


    it('creates new version with given major component', () => {
        builder = new VersionBuilder(3, 4, 5, ReleaseStatus.Stable);

        builder.major = 5;

        expect(builder.getValue().toString()).toBe('5.4.5');
    });


    it('creates new version with given minor component', () => {
        builder = new VersionBuilder(3, 4, 5, ReleaseStatus.Stable);

        builder.minor = 5;

        expect(builder.getValue().toString()).toBe('3.5.5');
    });


    it('creates new version with given patch component', () => {
        builder = new VersionBuilder(3, 4, 1, ReleaseStatus.Stable);

        builder.patch = 5;

        expect(builder.getValue().toString()).toBe('3.4.5');
    });


    it('creates new version with given status component', () => {
        builder = new VersionBuilder(3, 4, 1, ReleaseStatus.Beta, 3);

        builder.releaseStatus = ReleaseStatus.ReleaseCandidate;

        expect(builder.getValue().toString()).toBe('3.4.1-rc.3');
    });


    it('creates new version with given revision component', () => {
        builder = new VersionBuilder(3, 4, 1, ReleaseStatus.ReleaseCandidate, 1);

        builder.revision = 5;

        expect(builder.getValue().toString()).toBe('3.4.1-rc.5');
    });
});
