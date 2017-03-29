import {ICloneable, IJSONSerializable} from '../Core/types';
import {ReleaseStatus, VERSION_PATTERN, VERSION_PRE_RELEASE_STAGES} from './types';
import StringBuilder from './Text/StringBuilder';
import VersionException from './VersionException';
import {assertArgumentNotNull} from '../Assertion/Assert';


export default class Version implements ICloneable<Version>, IJSONSerializable<string> {
    
    public static validate(version: string): boolean {
        assertArgumentNotNull('version', version);

        return VERSION_PATTERN.test(version);
    }


    private _major: number;
    private _minor: number;
    private _patch: number;
    private _status: ReleaseStatus;
    private _revision: number;
    
    
    public get major(): number {
        return this._major;
    }
    
    
    public set major(value: number) {
        assertArgumentNotNull('value', value);

        if (value <= this._major) {
            throw new VersionException('New major version must be greater than current.');
        }

        this._major = value;
        this._minor = 0;
        this._patch = 0;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    public get minor(): number {
        return this._minor;
    }


    public set minor(value: number) {
        assertArgumentNotNull('value', value);

        if (value <= this._minor) {
            throw new VersionException('New minor version must be greater than current.');
        }

        this._minor = value;
        this._patch = 0;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    public get patch(): number {
        return this._patch;
    }


    public set patch(value: number) {
        assertArgumentNotNull('value', value);

        if (value <= this._patch) {
            throw new VersionException('New patch version must be greater than current.');
        }

        this._patch = value;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    public get status(): ReleaseStatus {
        return this._status;
    }


    public set status(value: ReleaseStatus) {
        assertArgumentNotNull('value', value);

        if (value !== ReleaseStatus.Stable && value <= this._status) {
            throw new VersionException('New release stage should be greater than current.');
        }
        
        this._status = value;
        this._revision = 0;
    }


    public get revision(): number {
        return this._revision;
    }


    public set revision(value: number) {
        assertArgumentNotNull('value', value);

        if (this._status === ReleaseStatus.Stable) {
            throw new VersionException('Cannot set pre-release version because release stage is final.');
        }

        if (value <= this._revision) {
            throw new VersionException('New pre-release version should be greater than current.');
        }

        this._revision = value;
    }


    public constructor(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        status: ReleaseStatus = ReleaseStatus.Alpha,
        revision: number = 0
    ) {
        assertArgumentNotNull('major', major);
        assertArgumentNotNull('minor', minor);
        assertArgumentNotNull('patch', patch);
        assertArgumentNotNull('status', status);
        assertArgumentNotNull('revision', revision);

        this._major = major;
        this._minor = minor;
        this._patch = patch;
        this._status = status;
        this._revision = revision;
    }


    public clone(): Version {
        return new Version(this._major, this._minor, this._patch, this._status, this._revision);
    }

    
    public toJSON(): string {
        return this.toString();
    }
    
    
    public toString(): string {
        let versionBuilder: StringBuilder = new StringBuilder();
        let preReleaseStage: string = VERSION_PRE_RELEASE_STAGES[this._status];
        
        versionBuilder.append(`${this._major}.${this._minor}.${this._patch}`);
        
        if (this._status !== ReleaseStatus.Stable) {
            versionBuilder.append(`-${preReleaseStage}`);

            if (this._revision > 0) {
                versionBuilder.append(`.${this._revision}`);
            }
        }
        
        return versionBuilder.toString();
    }
}
