import {
    Comparable,
    ComparisonResult,
    Equatable,
    InvalidArgumentException,
    NumberComparator,
    ObjectComparator,
    ObjectEqualityComparator,
    StringBuilder,
    ToJSON,
    ToString
} from '@monument/core';
import {ReleaseStatus} from './ReleaseStatus';
import {VersionComponents} from './VersionComponents';
import {VersionFormatException} from './VersionFormatException';
import {VersionBuilder} from './VersionBuilder';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 * @final
 */
export class Version
    implements Equatable<VersionComponents>,
        Equatable<string>,
        Comparable<VersionComponents>,
        Comparable<string>,
        ToJSON<string>,
        ToString {

    private static readonly VERSION_PRE_RELEASE_STAGES = {
        [ReleaseStatus.ALPHA]: 'alpha',
        [ReleaseStatus.BETA]: 'beta',
        [ReleaseStatus.RELEASE_CANDIDATE]: 'rc'
    };
    private static readonly MAJOR_COMPONENT_INDEX = 1;
    private static readonly MINOR_COMPONENT_INDEX = 2;
    private static readonly PATCH_COMPONENT_INDEX = 3;
    private static readonly RELEASE_STATUS_COMPONENT_INDEX = 5;
    private static readonly REVISION_COMPONENT_INDEX = 7;
    public static readonly ZERO: Version = new Version();
    public static readonly PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;

    private static getMajor(source: string): number {
        return parseInt(source, 10);
    }

    private static getMinor(source: string): number {
        return parseInt(source, 10);
    }

    private static getPatch(source: string): number {
        return parseInt(source, 10);
    }

    private static getReleaseStatus(source: string | undefined): ReleaseStatus {
        switch (source) {
            case 'alpha':
                return ReleaseStatus.ALPHA;

            case 'beta':
                return ReleaseStatus.BETA;

            case 'rc':
                return ReleaseStatus.RELEASE_CANDIDATE;

            default:
                return ReleaseStatus.STABLE;
        }
    }

    private static getRevision(source: string | undefined): number {
        if (source) {
            return parseInt(source, 10);
        } else {
            return 0;
        }
    }

    private _major!: number;
    private _minor!: number;
    private _patch!: number;
    private _releaseStatus!: ReleaseStatus;
    private _revision!: number;
    private _serialized: string | undefined;

    public get major(): number {
        return this._major;
    }

    public get minor(): number {
        return this._minor;
    }

    public get nextMajor(): Version {
        return new Version(this.major + 1);
    }

    public get nextMinor(): Version {
        return new Version(this.major, this.minor + 1);
    }

    public get nextPatch(): Version {
        return new Version(this.major, this.minor, this.patch + 1);
    }

    public get nextReleaseStatus(): Version {
        if (this.releaseStatus < ReleaseStatus.STABLE) {
            return new Version(
                this.major,
                this.minor,
                this.patch,
                this.releaseStatus + 1
            );
        }

        return this;
    }

    public get nextRevision(): Version {
        return new Version(
            this.major,
            this.minor,
            this.patch,
            this.releaseStatus,
            this.revision + 1
        );
    }

    public get patch(): number {
        return this._patch;
    }

    public get releaseStatus(): ReleaseStatus {
        return this._releaseStatus;
    }

    public get revision(): number {
        return this._revision;
    }

    public constructor();
    public constructor(components: VersionComponents);
    public constructor(value: string);
    public constructor(major: number);
    public constructor(major: number, minor: number);
    public constructor(major: number, minor: number, patch: number);
    public constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus);
    public constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus, revision: number);
    public constructor(
        major: number | string | VersionComponents = 0,
        minor: number = 0,
        patch: number = 0,
        releaseStatus: ReleaseStatus = ReleaseStatus.ALPHA,
        revision: number = 0
    ) {
        let _major: number;
        let _minor: number;
        let _patch: number;
        let _releaseStatus: ReleaseStatus;
        let _revision: number;

        switch (typeof major) {
            case 'string':
                const parts: RegExpExecArray | null = Version.PATTERN.exec(major);

                if (parts == null) {
                    throw new VersionFormatException(`Invalid version format.`);
                }

                _major = Version.getMajor(parts[Version.MAJOR_COMPONENT_INDEX]);
                _minor = Version.getMinor(parts[Version.MINOR_COMPONENT_INDEX]);
                _patch = Version.getPatch(parts[Version.PATCH_COMPONENT_INDEX]);
                _releaseStatus = Version.getReleaseStatus(parts[Version.RELEASE_STATUS_COMPONENT_INDEX]);
                _revision = Version.getRevision(parts[Version.REVISION_COMPONENT_INDEX]);

                break;

            case 'object':
                const components: VersionComponents = major;

                _major = components.major;
                _minor = components.minor;
                _patch = components.patch;
                _releaseStatus = components.releaseStatus;
                _revision = components.revision;

                break;

            default:
                _major = major;
                _minor = minor;
                _patch = patch;
                _releaseStatus = releaseStatus;
                _revision = revision;
                break;
        }

        this.setMajor(_major);
        this.setMinor(_minor);
        this.setPatch(_patch);
        this.setReleaseStatus(_releaseStatus);
        this.setRevision(_revision);
    }

    public compareTo(other: string): ComparisonResult;
    public compareTo(other: VersionComponents): ComparisonResult;
    public compareTo(other: VersionComponents | string): ComparisonResult {
        const components: VersionComponents = typeof other === 'object' ? other : new Version(other);
        const comparator: ObjectComparator = new ObjectComparator();

        comparator.compareFields(this.major, components.major, NumberComparator.get());
        comparator.compareFields(this.minor, components.minor, NumberComparator.get());
        comparator.compareFields(this.patch, components.patch, NumberComparator.get());
        comparator.compareFields(this.releaseStatus, components.releaseStatus, NumberComparator.get());
        comparator.compareFields(this.revision, components.revision, NumberComparator.get());

        return comparator.result;
    }

    public equals(other: string): boolean;
    public equals(other: VersionComponents): boolean;
    public equals(other: VersionComponents | string): boolean {
        const components: VersionComponents = typeof other === 'object' ? other : new Version(other);
        const comparator: ObjectEqualityComparator<VersionComponents> = new ObjectEqualityComparator(this, components);

        comparator.withField(this.major, components.major);
        comparator.withField(this.minor, components.minor);
        comparator.withField(this.patch, components.patch);
        comparator.withField(this.releaseStatus, components.releaseStatus);
        comparator.withField(this.revision, components.revision);

        return comparator.result;
    }

    public toJSON(): string {
        return this.toString();
    }

    public toString(): string {
        if (this._serialized == null) {
            const result: StringBuilder = new StringBuilder();
            const {minor, major, patch, revision, releaseStatus} = this;

            result.append(`${major}.${minor}.${patch}`);

            if (releaseStatus !== ReleaseStatus.STABLE) {
                const preReleaseStage: string = Version.VERSION_PRE_RELEASE_STAGES[releaseStatus];

                result.append(`-${preReleaseStage}`);

                if (revision > 0) {
                    result.append(`.${revision}`);
                }
            }

            this._serialized = result.toString();
        }

        return this._serialized;
    }

    public withMajor(value: number): Version {
        const builder: VersionBuilder = new VersionBuilder(this);

        builder.major = value;

        return builder.build();
    }

    public withMinor(value: number): Version {
        const builder: VersionBuilder = new VersionBuilder(this);

        builder.minor = value;

        return builder.build();
    }

    public withPatch(value: number): Version {
        const builder: VersionBuilder = new VersionBuilder(this);

        builder.patch = value;

        return builder.build();
    }

    public withReleaseStatus(value: ReleaseStatus): Version {
        const builder: VersionBuilder = new VersionBuilder(this);

        builder.releaseStatus = value;

        return builder.build();
    }

    public withRevision(value: number): Version {
        const builder: VersionBuilder = new VersionBuilder(this);

        builder.revision = value;

        return builder.build();
    }

    private setMajor(value: number) {
        if (!isFinite(value) || isNaN(value) || value < 0) {
            throw new InvalidArgumentException('Version major component is invalid.');
        }

        this._major = value;
    }

    private setMinor(value: number) {
        if (!isFinite(value) || isNaN(value) || value < 0) {
            throw new InvalidArgumentException('Version minor component is invalid.');
        }

        this._minor = value;
    }

    private setPatch(value: number) {
        if (!isFinite(value) || isNaN(value) || value < 0) {
            throw new InvalidArgumentException('Version patch component is invalid.');
        }

        this._patch = value;
    }

    private setReleaseStatus(value: ReleaseStatus) {
        if (!isFinite(value) || isNaN(value) || value < ReleaseStatus.ALPHA || value > ReleaseStatus.STABLE) {
            throw new InvalidArgumentException('Version release status component is invalid.');
        }

        this._releaseStatus = value;
    }

    private setRevision(value: number) {
        if (!isFinite(value) || isNaN(value) || value < 0) {
            throw new InvalidArgumentException('Version revision component is invalid.');
        }

        this._revision = value;
    }
}
