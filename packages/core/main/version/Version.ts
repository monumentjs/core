import {ReleaseStatus} from './ReleaseStatus';
import {Equatable} from '../utils/comparison/Equatable';
import {Cloneable} from '../Cloneable';
import {JSONSerializable} from '../JSONSerializable';
import {StringBuilder} from '../text/StringBuilder';

const VERSION_PRE_RELEASE_STAGES = {
    [ReleaseStatus.ALPHA]: 'alpha',
    [ReleaseStatus.BETA]: 'beta',
    [ReleaseStatus.RELEASE_CANDIDATE]: 'rc'
};


export class Version implements Equatable<Version>, Cloneable<Version>, JSONSerializable<string> {
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
        if (this.major !== other.major) {
            return false;
        }

        if (this.minor !== this.minor) {
            return false;
        }

        if (this.patch !== other.patch) {
            return false;
        }

        if (this.releaseStatus !== other.releaseStatus) {
            return false;
        }

        if (this.revision !== other.revision) {
            return false;
        }

        return true;
    }


    public toString(): string {
        const versionBuilder: StringBuilder = new StringBuilder();

        versionBuilder.append(`${this.major}.${this.minor}.${this.patch}`);

        if (this.releaseStatus !== ReleaseStatus.STABLE) {
            const preReleaseStage: string = VERSION_PRE_RELEASE_STAGES[this.releaseStatus];

            versionBuilder.append(`-${preReleaseStage}`);

            if (this.revision > 0) {
                versionBuilder.append(`.${this.revision}`);
            }
        }

        return versionBuilder.toString();
    }
}
