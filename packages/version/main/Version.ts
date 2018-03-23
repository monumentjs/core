import {ReleaseStatus} from './ReleaseStatus';
import {Cloneable} from '@monument/core/main/Cloneable';
import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {StringBuilder} from '@monument/text/main/StringBuilder';


const VERSION_PRE_RELEASE_STAGES = {
    [ReleaseStatus.Alpha]: 'alpha',
    [ReleaseStatus.Beta]: 'beta',
    [ReleaseStatus.ReleaseCandidate]: 'rc'
};


export class Version implements Cloneable<Version>, JSONSerializable<string> {
    public static readonly PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;
    public static readonly ZERO: Version = new Version();

    private _major: number;
    private _minor: number;
    private _patch: number;
    private _releaseStatus: ReleaseStatus;
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
        releaseStatus: ReleaseStatus = ReleaseStatus.Alpha,
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
        if (this.releaseStatus < ReleaseStatus.Stable) {
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


    public toString(): string {
        let versionBuilder: StringBuilder = new StringBuilder();

        versionBuilder.append(`${this.major}.${this.minor}.${this.patch}`);

        if (this.releaseStatus !== ReleaseStatus.Stable) {
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
