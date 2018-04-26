import {Cloneable} from '@monument/core/main/Cloneable';
import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {Comparable} from '@monument/core/main/Comparable';
import {Equatable} from '@monument/core/main/Equatable';
import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {NumberComparator} from '@monument/core/main/NumberComparator';
import {StringBuilder} from '@monument/text/main/StringBuilder';
import {ReleaseStatus} from './ReleaseStatus';


const VERSION_PRE_RELEASE_STAGES = {
    [ReleaseStatus.ALPHA]: 'alpha',
    [ReleaseStatus.BETA]: 'beta',
    [ReleaseStatus.RELEASE_CANDIDATE]: 'rc'
};


export class Version implements Comparable<Version>, Equatable<Version>, Cloneable<Version>, JSONSerializable<string> {
    public static readonly PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;
    public static readonly ZERO: Version = new Version();

    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;
    private readonly _releaseStatus: ReleaseStatus;
    private readonly _revision: number;


    public get major(): number {
        return this._major;
    }


    public get minor(): number {
        return this._minor;
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


    public constructor(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        releaseStatus: ReleaseStatus = ReleaseStatus.ALPHA,
        revision: number = 0
    ) {
        this._major = major;
        this._minor = minor;
        this._patch = patch;
        this._releaseStatus = releaseStatus;
        this._revision = revision;
    }


    public getNextMajorVersion(): Version {
        return new Version(this.major + 1);
    }


    public getNextMinorVersion(): Version {
        return new Version(this.major, this.minor + 1);
    }


    public getNextPatchVersion(): Version {
        return new Version(this.major, this.minor, this.patch + 1);
    }


    public getNextReleaseStatusVersion(): Version {
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


    public getNextRevision(): Version {
        return new Version(
            this.major,
            this.minor,
            this.patch,
            this.releaseStatus,
            this.revision + 1
        );
    }


    public clone(): Version {
        return new Version(
            this.major,
            this.minor,
            this.patch,
            this.releaseStatus,
            this.revision
        );
    }


    public toJSON(): string {
        return this.toString();
    }


    public equals(other: Version): boolean {
        {
            let result = NumberComparator.instance.compare(this.major, other.major);

            if (result !== ComparisonResult.EQUALS) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.minor, other.minor);

            if (result !== ComparisonResult.EQUALS) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.patch, other.patch);

            if (result !== ComparisonResult.EQUALS) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.releaseStatus, other.releaseStatus);

            if (result !== ComparisonResult.EQUALS) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.revision, other.revision);

            if (result !== ComparisonResult.EQUALS) {
                return false;
            }
        }

        return true;
    }


    public compareTo(other: Version): ComparisonResult {
        {
            let result = NumberComparator.instance.compare(this.major, other.major);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.minor, other.minor);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.patch, other.patch);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.releaseStatus, other.releaseStatus);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(this.revision, other.revision);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        return ComparisonResult.EQUALS;
    }


    public toString(): string {
        let versionBuilder: StringBuilder = new StringBuilder();

        versionBuilder.append(`${this.major}.${this.minor}.${this.patch}`);

        if (this.releaseStatus !== ReleaseStatus.STABLE) {
            let preReleaseStage: string =
                VERSION_PRE_RELEASE_STAGES[this.releaseStatus];

            versionBuilder.append(`-${preReleaseStage}`);

            if (this.revision > 0) {
                versionBuilder.append(`.${this.revision}`);
            }
        }

        return versionBuilder.toString();
    }
}
