import {ComparisonResult, ICloneable, IComparable, IEquatable, IJSONSerializable} from '../types';
import {ReleaseStatus, VERSION_PRE_RELEASE_STAGES} from './types';
import {StringBuilder} from '../Text/StringBuilder';
import {Assert} from '../Assertion/Assert';
import {VersionComparator} from './VersionComparator';
import {UnitGetter} from '../DI/Decorators/UnitGetter';


export class Version implements IEquatable<Version>, IComparable<Version>, ICloneable<Version>, IJSONSerializable<string> {
    @UnitGetter(VersionComparator)
    private readonly comparator: VersionComparator;

    private _major: number;
    private _minor: number;
    private _patch: number;
    private _status: ReleaseStatus;
    private _revision: number;


    public get major(): number {
        return this._major;
    }


    public get minor(): number {
        return this._minor;
    }


    public get patch(): number {
        return this._patch;
    }


    public get status(): ReleaseStatus {
        return this._status;
    }


    public get revision(): number {
        return this._revision;
    }


    public constructor(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        status: ReleaseStatus = ReleaseStatus.Alpha,
        revision: number = 0
    ) {
        Assert.argument('major', major).notNull();
        Assert.argument('minor', minor).notNull();
        Assert.argument('patch', patch).notNull();
        Assert.argument('status', status).notNull();
        Assert.argument('revision', revision).notNull();

        this._major = major;
        this._minor = minor;
        this._patch = patch;
        this._status = status;
        this._revision = revision;
    }


    public compareTo(other: Version): ComparisonResult {
        return this.comparator.compare(this, other);
    }


    public equals(other: Version): boolean {
        return this.comparator.equals(this, other);
    }


    public clone(): Version {
        return new Version(this.major, this.minor, this.patch, this.status, this.revision);
    }


    public toJSON(): string {
        return this.toString();
    }


    public toString(): string {
        let versionBuilder: StringBuilder = new StringBuilder();
        let preReleaseStage: string = VERSION_PRE_RELEASE_STAGES[this.status];

        versionBuilder.append(`${this.major}.${this.minor}.${this.patch}`);

        if (this.status !== ReleaseStatus.Stable) {
            versionBuilder.append(`-${preReleaseStage}`);

            if (this.revision > 0) {
                versionBuilder.append(`.${this.revision}`);
            }
        }

        return versionBuilder.toString();
    }
}
