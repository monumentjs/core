import {ReleaseStatus} from '../../../Source/Version/types';
import {Version} from '../../../Source/Version/Version';


describe('Version', () => {
    let version: Version = null;


    beforeEach(() => {
        version = new Version();
    });


    describe('#constructor()', () => {
        it('creates new instance of Version class / 0 arguments', () => {
            expect(version.major).toEqual(0);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);
        });

        it('creates new instance of Version class / 1 argument', () => {
            version = new Version(1);

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(0);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);
        });

        it('creates new instance of Version class / 2 arguments', () => {
            version = new Version(1, 1);

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(0);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);
        });

        it('creates new instance of Version class / 3 arguments', () => {
            version = new Version(1, 1, 1);

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Alpha);
            expect(version.revision).toEqual(0);
        });

        it('creates new instance of Version class / 4 arguments', () => {
            version = new Version(1, 1, 1, ReleaseStatus.Beta);

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Beta);
            expect(version.revision).toEqual(0);
        });

        it('creates new instance of Version class / 5 arguments', () => {
            version = new Version(1, 1, 1, ReleaseStatus.Beta, 1);

            expect(version.major).toEqual(1);
            expect(version.minor).toEqual(1);
            expect(version.patch).toEqual(1);
            expect(version.status).toEqual(ReleaseStatus.Beta);
            expect(version.revision).toEqual(1);
        });
    });


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
});