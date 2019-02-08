import { ReleaseStatus, VersionBuilder } from '..';

describe('VersionBuilder', function() {
    describe('constructor()', function() {
        it('should create new instance of VersionBuilder initialized by default version', function() {
            const builder: VersionBuilder = new VersionBuilder();

            expect(builder.build().toString()).toBe('0.0.0-alpha');
        });

        it('should create new instance of VersionBuilder initialized by custom version', function() {
            let builder: VersionBuilder;

            builder = new VersionBuilder(2, 2, 4, ReleaseStatus.RELEASE_CANDIDATE, 3);
            expect(builder.build().toString()).toBe('2.2.4-rc.3');

            builder = new VersionBuilder(2, 2, 4, ReleaseStatus.STABLE, 3);
            expect(builder.build().toString()).toBe('2.2.4');
        });
    });

    it('build() creates new version with given major component', function() {
        const builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.STABLE);

        builder.major = 5;

        expect(builder.build().toString()).toBe('5.4.5');
    });

    it('build() creates new version with given minor component', function() {
        const builder: VersionBuilder = new VersionBuilder(3, 4, 5, ReleaseStatus.STABLE);

        builder.minor = 5;

        expect(builder.build().toString()).toBe('3.5.5');
    });

    it('build() creates new version with given patch component', function() {
        const builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.STABLE);

        builder.patch = 5;

        expect(builder.build().toString()).toBe('3.4.5');
    });

    it('build() creates new version with given status component', function() {
        const builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.BETA, 3);

        builder.releaseStatus = ReleaseStatus.RELEASE_CANDIDATE;

        expect(builder.build().toString()).toBe('3.4.1-rc.3');
    });

    it('build() creates new version with given revision component', function() {
        const builder: VersionBuilder = new VersionBuilder(3, 4, 1, ReleaseStatus.RELEASE_CANDIDATE, 1);

        builder.revision = 5;

        expect(builder.build().toString()).toBe('3.4.1-rc.5');
    });
});
