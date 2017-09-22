import {ReleaseStatus} from './ReleaseStatus';
import {StringBuilder} from '../Text/StringBuilder';
import {ComparisonResult} from '../Core/Types/ComparisonResult';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IComparable} from '../Core/Abstraction/IComparable';
import {ICloneable} from '../Core/Abstraction/ICloneable';
import {IJSONSerializable} from '../Core/Abstraction/IJSONSerializable';
import {IPropertyAccess} from '../Core/Abstraction/IPropertyAccess';


const VERSION_PRE_RELEASE_STAGES: string[] = ['alpha', 'beta', 'rc'];
const VERSION_COMPONENTS: string[] = ['major', 'minor', 'patch', 'releaseStatus', 'revision'];


export class Version implements IEquatable<Version>, IComparable<Version>, ICloneable<Version>, IJSONSerializable<string> {
    public static readonly PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;


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
            return new Version(this.major, this.minor, this.patch, this.releaseStatus + 1);
        }

        return this;
    }


    public getNextRevision(): Version {
        return new Version(this.major, this.minor, this.patch, this.releaseStatus, this.revision + 1);
    }


    public compareTo(other: Version): ComparisonResult {
        for (let componentName of VERSION_COMPONENTS) {
            let componentOfCurrentVersion: number = (this as IPropertyAccess<any>)[componentName];
            let componentOfOtherVersion: number = (other as IPropertyAccess<any>)[componentName];
            let result: ComparisonResult = this.compareVersionComponents(
                componentOfCurrentVersion,
                componentOfOtherVersion
            );

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        return ComparisonResult.Equals;
    }


    public equals(other: Version): boolean {
        for (let componentName of VERSION_COMPONENTS) {
            let componentOfCurrentVersion: number = (this as IPropertyAccess<any>)[componentName] as number;
            let componentOfOtherVersion: number = (other as IPropertyAccess<any>)[componentName] as number;

            if (componentOfCurrentVersion !== componentOfOtherVersion) {
                return false;
            }
        }

        return true;
    }


    public clone(): Version {
        return new Version(this.major, this.minor, this.patch, this.releaseStatus, this.revision);
    }


    public toJSON(): string {
        return this.toString();
    }


    public toString(): string {
        let versionBuilder: StringBuilder = new StringBuilder();
        let preReleaseStage: string = VERSION_PRE_RELEASE_STAGES[this.releaseStatus];

        versionBuilder.append(`${this.major}.${this.minor}.${this.patch}`);

        if (this.releaseStatus !== ReleaseStatus.Stable) {
            versionBuilder.append(`-${preReleaseStage}`);

            if (this.revision > 0) {
                versionBuilder.append(`.${this.revision}`);
            }
        }

        return versionBuilder.toString();
    }


    private compareVersionComponents(current: number, other: number): ComparisonResult {
        return current < other ? ComparisonResult.Less
            : current > other ? ComparisonResult.Greater
                : ComparisonResult.Equals;
    }
}
