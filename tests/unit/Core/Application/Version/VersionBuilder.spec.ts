import VersionBuilder from '../../../../../src/Core/Application/Version/VersionBuilder';
import Version from '../../../../../src/Core/Application/Version/Version';
import {ReleaseStatus} from '../../../../../src/Core/Application/Version/types';
import VersionException from '../../../../../src/Core/Application/Version/VersionException';
import ArgumentNullException from '../../../../../src/Core/Exceptions/ArgumentNullException';


describe(`VersionBuilder`, () => {
    let instance: VersionBuilder;


    beforeEach(() => {
        instance = new VersionBuilder();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of VersionBuilder initialized by default version`, () => {
            expect(instance).toBeInstanceOf(VersionBuilder);
            expect(instance.version.toString()).toBe('0.0.0-alpha');
        });

        it(`creates new instance of VersionBuilder initialized by custom version`, () => {
            instance = new VersionBuilder(new Version(2, 2, 4, ReleaseStatus.ReleaseCandidate, 3));
            expect(instance.version.toString()).toBe('2.2.4-rc.3');
        });
    });


    describe('#setMajor()', () => {
        beforeEach(() => {
            instance = new VersionBuilder(new Version(2, 2, 0, ReleaseStatus.Alpha, 3));
        });

        it(`throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.setMajor(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'value' argument is null`, () => {
            expect(() => {
                instance.setMajor(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if new major component is less that current`, () => {
            expect(() => {
                instance.setMajor(1);
            }).toThrowError(VersionException);
        });

        it('creates new version with given major component', () => {
            instance = new VersionBuilder(new Version(3, 4, 5, ReleaseStatus.Stable));

            instance.setMajor(5);

            expect(instance.version.toString()).toBe('5.0.0-alpha');
        });
    });


    describe('#setMinor()', () => {
        beforeEach(() => {
            instance = new VersionBuilder(new Version(2, 2, 0, ReleaseStatus.Alpha, 3));
        });

        it(`throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.setMinor(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'value' argument is null`, () => {
            expect(() => {
                instance.setMinor(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if new minor component is less that current`, () => {
            expect(() => {
                instance.setMinor(1);
            }).toThrowError(VersionException);
        });

        it('creates new version with given minor component', () => {
            instance = new VersionBuilder(new Version(3, 4, 5, ReleaseStatus.Stable));

            instance.setMinor(5);

            expect(instance.version.toString()).toBe('3.5.0-alpha');
        });
    });


    describe('#setPatch()', () => {
        beforeEach(() => {
            instance = new VersionBuilder(new Version(2, 2, 4, ReleaseStatus.Alpha, 3));
        });

        it(`throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.setPatch(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'value' argument is null`, () => {
            expect(() => {
                instance.setPatch(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if new patch component is less that current`, () => {
            expect(() => {
                instance.setPatch(1);
            }).toThrowError(VersionException);
        });

        it('creates new version with given patch component', () => {
            instance = new VersionBuilder(new Version(3, 4, 1, ReleaseStatus.Stable));

            instance.setPatch(5);

            expect(instance.version.toString()).toBe('3.4.5-alpha');
        });
    });


    describe('#setStatus()', () => {
        beforeEach(() => {
            instance = new VersionBuilder(new Version(2, 2, 4, ReleaseStatus.Beta, 3));
        });

        it(`throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.setStatus(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'value' argument is null`, () => {
            expect(() => {
                instance.setStatus(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if new status component is less that current`, () => {
            expect(() => {
                instance.setStatus(ReleaseStatus.Alpha);
            }).toThrowError(VersionException);
        });

        it('creates new version with given status component', () => {
            instance = new VersionBuilder(new Version(3, 4, 1, ReleaseStatus.Beta, 3));

            instance.setStatus(ReleaseStatus.ReleaseCandidate);

            expect(instance.version.toString()).toBe('3.4.1-rc');
        });
    });


    describe('#setRevision()', () => {
        beforeEach(() => {
            instance = new VersionBuilder(new Version(2, 2, 4, ReleaseStatus.Alpha, 3));
        });

        it(`throws if 'value' argument is not defined`, () => {
            expect(() => {
                instance.setRevision(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'value' argument is null`, () => {
            expect(() => {
                instance.setRevision(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if new revision component is less that current`, () => {
            expect(() => {
                instance.setRevision(1);
            }).toThrowError(VersionException);
        });

        it('creates new version with given revision component', () => {
            instance = new VersionBuilder(new Version(3, 4, 1, ReleaseStatus.ReleaseCandidate, 1));

            instance.setRevision(5);

            expect(instance.version.toString()).toBe('3.4.1-rc.5');
        });
    });


    describe('#getNextMajorVersion()', () => {
        it('creates next major version', () => {
            instance.nextMajorVersion();

            expect(instance.version.toString()).toBe('1.0.0-alpha');
        });
    });


    describe('#nextMinorVersion()', () => {
        it('creates next minor version', () => {
            instance.nextMinorVersion();

            expect(instance.version.toString()).toBe('0.1.0-alpha');
        });
    });


    describe('#nextPatchVersion()', () => {
        it('creates next patch version', () => {
            instance.nextPatchVersion();

            expect(instance.version.toString()).toBe('0.0.1-alpha');
        });
    });


    describe('#nextStatusVersion()', () => {
        it('creates next status version', () => {
            instance.nextStatusVersion();
            expect(instance.version.toString()).toBe('0.0.0-beta');

            instance.nextStatusVersion();
            expect(instance.version.toString()).toBe('0.0.0-rc');

            instance.nextStatusVersion();
            expect(instance.version.toString()).toBe('0.0.0');

            instance.nextStatusVersion();
            expect(instance.version.toString()).toBe('0.0.1-alpha');
        });
    });


    describe('#nextRevisionVersion()', () => {
        it('creates next revision version', () => {
            instance.nextRevisionVersion();

            expect(instance.version.toString()).toBe('0.0.0-alpha.1');
        });
    });
});