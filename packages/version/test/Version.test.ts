import { ReleaseStatus, Version, VersionFormatException } from '..';
import { ComparisonResult, InvalidArgumentException } from '@monument/core';

describe('Version', function() {
    describe('ZERO', function() {
        it('should have all properties set to zero', function() {
            const version: Version = Version.ZERO;

            expect(version.major).toBe(0);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(version.revision).toBe(0);
        });
    });

    describe('constructor()', function() {
        it('should create new instance of Version class w/ 0 arguments', function() {
            const version: Version = new Version();

            expect(version.major).toBe(0);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(version.revision).toBe(0);
        });
    });

    describe('constructor(string)', function() {
        it('should parse string version', function() {
            {
                const version: Version = new Version('1.2.3');

                expect(version.major).toBe(1);
                expect(version.minor).toBe(2);
                expect(version.patch).toBe(3);
                expect(version.releaseStatus).toBe(ReleaseStatus.STABLE);
                expect(version.revision).toBe(0);
            }

            {
                const version: Version = new Version('1.2.3-alpha');

                expect(version.major).toBe(1);
                expect(version.minor).toBe(2);
                expect(version.patch).toBe(3);
                expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
                expect(version.revision).toBe(0);
            }

            {
                const version: Version = new Version('1.2.3-beta');

                expect(version.major).toBe(1);
                expect(version.minor).toBe(2);
                expect(version.patch).toBe(3);
                expect(version.releaseStatus).toBe(ReleaseStatus.BETA);
                expect(version.revision).toBe(0);
            }

            {
                const version: Version = new Version('1.2.3-rc');

                expect(version.major).toBe(1);
                expect(version.minor).toBe(2);
                expect(version.patch).toBe(3);
                expect(version.releaseStatus).toBe(ReleaseStatus.RELEASE_CANDIDATE);
                expect(version.revision).toBe(0);
            }

            {
                const version: Version = new Version('1.2.3-rc.2');

                expect(version.major).toBe(1);
                expect(version.minor).toBe(2);
                expect(version.patch).toBe(3);
                expect(version.releaseStatus).toBe(ReleaseStatus.RELEASE_CANDIDATE);
                expect(version.revision).toBe(2);
            }
        });

        it('should throw VersionFormatException if string cannot be parsed', function() {
            expect(() => {
                return new Version('a.b.c');
            }).toThrow(VersionFormatException);
        });
    });

    describe('constructor(major)', function() {
        it('should create new instance of Version class w/ 1 argument', function() {
            const version: Version = new Version(1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(0);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(version.revision).toBe(0);
        });

        it('should throw InvalidArgumentException if major component is not valid', function() {
            expect(() => {
                return new Version(NaN);
            }).toThrow(InvalidArgumentException);
        });
    });

    describe('constructor(major, minor)', function() {
        it('should create new instance of Version class w/ 2 arguments', function() {
            const version: Version = new Version(1, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(0);
            expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(version.revision).toBe(0);
        });

        it('should throw InvalidArgumentException if major component is not valid', function() {
            expect(() => {
                return new Version(NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if minor component is not valid', function() {
            expect(() => {
                return new Version(0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if major and minor components are not valid', function() {
            expect(() => {
                return new Version(NaN, NaN);
            }).toThrow(InvalidArgumentException);
        });
    });

    describe('constructor(major, minor, patch)', function() {
        it('should create new instance of Version class w/ 3 arguments', function() {
            const version: Version = new Version(1, 1, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(version.revision).toBe(0);
        });

        it('should throw InvalidArgumentException if major component is not valid', function() {
            expect(() => {
                return new Version(NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if minor component is not valid', function() {
            expect(() => {
                return new Version(0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if patch component is not valid', function() {
            expect(() => {
                return new Version(0, 0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if major, minor and patch components are not valid', function() {
            expect(() => {
                return new Version(NaN, NaN, NaN);
            }).toThrow(InvalidArgumentException);
        });
    });

    describe('constructor(major, minor, patch, releaseStatus)', function() {
        it('should create new instance of Version class w/ 4 arguments', function() {
            const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(version.revision).toBe(0);
        });

        it('should throw InvalidArgumentException if major component is not valid', function() {
            expect(() => {
                return new Version(NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if minor component is not valid', function() {
            expect(() => {
                return new Version(0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if patch component is not valid', function() {
            expect(() => {
                return new Version(0, 0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if release status component is not valid', function() {
            expect(() => {
                return new Version(0, 0, 0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if major, minor, patch and release status components are not valid', function() {
            expect(() => {
                return new Version(NaN, NaN, NaN, NaN);
            }).toThrow(InvalidArgumentException);
        });
    });

    describe('constructor(major, minor, patch, releaseStatus, revision)', function() {
        it('should create new instance of Version class w/ 5 arguments', function() {
            const version: Version = new Version(1, 1, 1, ReleaseStatus.BETA, 1);

            expect(version.major).toBe(1);
            expect(version.minor).toBe(1);
            expect(version.patch).toBe(1);
            expect(version.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(version.revision).toBe(1);
        });

        it('should throw InvalidArgumentException if major component is not valid', function() {
            expect(() => {
                return new Version(NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if minor component is not valid', function() {
            expect(() => {
                return new Version(0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if patch component is not valid', function() {
            expect(() => {
                return new Version(0, 0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if release status component is not valid', function() {
            expect(() => {
                return new Version(0, 0, 0, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it('should throw InvalidArgumentException if revision component is not valid', function() {
            expect(() => {
                return new Version(0, 0, 0, ReleaseStatus.STABLE, NaN);
            }).toThrow(InvalidArgumentException);
        });

        it(
            'should throw InvalidArgumentException if major, minor, patch, release status and ' + 'revision components are not valid',
            function() {
                expect(() => {
                    return new Version(NaN, NaN, NaN, NaN, NaN);
                }).toThrow(InvalidArgumentException);
            }
        );
    });

    describe('nextMajor', function() {
        it('should return version with incremented major component', function() {
            const originalVersion: Version = new Version(1, 2, 3, ReleaseStatus.BETA);
            const nextVersion: Version = originalVersion.nextMajor;

            expect(nextVersion.major).toBe(2);
            expect(nextVersion.minor).toBe(0);
            expect(nextVersion.patch).toBe(0);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(nextVersion.revision).toBe(0);
        });
    });

    describe('nextMinor', function() {
        it('should return version with incremented minor component', function() {
            const originalVersion: Version = new Version(1, 2, 3, ReleaseStatus.BETA);
            const nextVersion: Version = originalVersion.nextMinor;

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(3);
            expect(nextVersion.patch).toBe(0);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(nextVersion.revision).toBe(0);
        });
    });

    describe('nextPatch', function() {
        it('should return version with incremented minor component', function() {
            const originalVersion: Version = new Version(1, 2, 3, ReleaseStatus.BETA);
            const nextVersion: Version = originalVersion.nextPatch;

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(4);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.ALPHA);
            expect(nextVersion.revision).toBe(0);
        });
    });

    describe('nextReleaseStatus', function() {
        it('should return version with next release status', function() {
            let originalVersion: Version;
            let nextVersion: Version;

            originalVersion = new Version(1, 2, 3, ReleaseStatus.BETA);
            nextVersion = originalVersion.nextReleaseStatus;

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(3);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.RELEASE_CANDIDATE);
            expect(nextVersion.revision).toBe(0);

            originalVersion = new Version(1, 2, 3, ReleaseStatus.STABLE);
            nextVersion = originalVersion.nextReleaseStatus;

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(3);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.STABLE);
            expect(nextVersion.revision).toBe(0);
        });
    });

    describe('nextRevision', function() {
        it('should return version with incremented revision', function() {
            const originalVersion: Version = new Version(1, 2, 3, ReleaseStatus.BETA);
            const nextVersion: Version = originalVersion.nextRevision;

            expect(nextVersion.major).toBe(1);
            expect(nextVersion.minor).toBe(2);
            expect(nextVersion.patch).toBe(3);
            expect(nextVersion.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(nextVersion.revision).toBe(1);
        });
    });

    describe('toString()', function() {
        it('should serialize version to string', function() {
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

    describe('toJSON()', function() {
        it('should serialize version to string', function() {
            expect(JSON.stringify(new Version())).toBe('"0.0.0-alpha"');
            expect(JSON.stringify(new Version(1))).toBe('"1.0.0-alpha"');
            expect(JSON.stringify(new Version(1, 1))).toBe('"1.1.0-alpha"');
            expect(JSON.stringify(new Version(1, 1, 1))).toBe('"1.1.1-alpha"');

            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.ALPHA))).toBe('"1.1.1-alpha"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.BETA))).toBe('"1.1.1-beta"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE))).toBe('"1.1.1-rc"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.STABLE))).toBe('"1.1.1"');

            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.ALPHA, 1))).toBe('"1.1.1-alpha.1"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.BETA, 1))).toBe('"1.1.1-beta.1"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.RELEASE_CANDIDATE, 1))).toBe('"1.1.1-rc.1"');
            expect(JSON.stringify(new Version(1, 1, 1, ReleaseStatus.STABLE, 1))).toBe('"1.1.1"');
        });
    });

    describe('compareTo(string)', function() {
        it('should compare current version with other specified as string', function() {
            {
                const version: Version = new Version(1, 2, 3, ReleaseStatus.STABLE);

                expect(version.compareTo('1.2.4')).toBe(ComparisonResult.LESS);
                expect(version.compareTo('1.2.3')).toBe(ComparisonResult.EQUALS);
                expect(version.compareTo('1.2.2')).toBe(ComparisonResult.GREATER);
            }
            {
                const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA);

                expect(version.compareTo('1.2.3')).toBe(ComparisonResult.LESS);
                expect(version.compareTo('1.2.3-rc')).toBe(ComparisonResult.LESS);
                expect(version.compareTo('1.2.3-beta')).toBe(ComparisonResult.EQUALS);
                expect(version.compareTo('1.2.3-alpha')).toBe(ComparisonResult.GREATER);
            }
        });

        it('should compare current version with other specified as components', function() {
            // TODO: test with components
        });
    });

    describe('equals(string)', function() {
        it('should compare current version with other specified as string', function() {
            {
                const version: Version = new Version(1, 2, 3, ReleaseStatus.STABLE);

                expect(version.equals('1.2.3')).toBe(true);
                expect(version.equals('1.2.3-alpha')).toBe(false);
                expect(version.equals('1.2.3-beta')).toBe(false);
                expect(version.equals('1.2.3-rc')).toBe(false);
            }
            {
                const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA);

                expect(version.equals('1.2.3-beta')).toBe(true);
            }
        });

        it('should compare current version with other specified as components', function() {
            // TODO: test with components
        });
    });

    describe('withMajor()', function() {
        it('should return a copy of current version with specified major component', function() {
            const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA, 3);
            const next: Version = version.withMajor(2);

            expect(next).not.toBe(version);
            expect(next.major).toBe(2);
            expect(next.minor).toBe(2);
            expect(next.patch).toBe(3);
            expect(next.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(next.revision).toBe(3);
        });
    });

    describe('withMinor()', function() {
        it('should return a copy of current version with specified minor component', function() {
            const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA, 3);
            const next: Version = version.withMinor(4);

            expect(next).not.toBe(version);
            expect(next.major).toBe(1);
            expect(next.minor).toBe(4);
            expect(next.patch).toBe(3);
            expect(next.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(next.revision).toBe(3);
        });
    });

    describe('withPatch()', function() {
        it('should return a copy of current version with specified patch component', function() {
            const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA, 3);
            const next: Version = version.withPatch(4);

            expect(next).not.toBe(version);
            expect(next.major).toBe(1);
            expect(next.minor).toBe(2);
            expect(next.patch).toBe(4);
            expect(next.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(next.revision).toBe(3);
        });
    });

    describe('withReleaseStatus()', function() {
        it('should return a copy of current version with specified release status component', function() {
            const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA, 3);
            const next: Version = version.withReleaseStatus(ReleaseStatus.STABLE);

            expect(next).not.toBe(version);
            expect(next.major).toBe(1);
            expect(next.minor).toBe(2);
            expect(next.patch).toBe(3);
            expect(next.releaseStatus).toBe(ReleaseStatus.STABLE);
            expect(next.revision).toBe(3);
        });
    });

    describe('withRevision()', function() {
        it('should return a copy of current version with specified revision component', function() {
            const version: Version = new Version(1, 2, 3, ReleaseStatus.BETA, 3);
            const next: Version = version.withRevision(4);

            expect(next).not.toBe(version);
            expect(next.major).toBe(1);
            expect(next.minor).toBe(2);
            expect(next.patch).toBe(3);
            expect(next.releaseStatus).toBe(ReleaseStatus.BETA);
            expect(next.revision).toBe(4);
        });
    });
});
