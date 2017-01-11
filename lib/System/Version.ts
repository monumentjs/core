import {IFormattable, ICloneable, IComparable, IJSONSerializable} from '../Core/types';
import {ReleaseStatus, VERSION_PATTERN, VersionComponents} from './types';


export default class Version
implements IFormattable, ICloneable<Version>, IComparable<Version>, IJSONSerializable<VersionComponents> {
    public static parse(version: string): Version {
        let major: number;
        let minor: number;
        let patch: number;
        let status: ReleaseStatus;
        let preReleaseVersion: number;
        let parts: RegExpExecArray = VERSION_PATTERN.exec(version);

        if (!parts) {
            throw new Error('Given value is not a valid version.');
        }

        major = parseInt(parts[1], 10);
        minor = parseInt(parts[2], 10);
        patch = parseInt(parts[3], 10);

        switch (parts[5]) {
            case 'alpha':
                status = ReleaseStatus.Alpha;
                break;

            case 'beta':
                status = ReleaseStatus.Beta;
                break;

            case 'rc':
                status = ReleaseStatus.ReleaseCandidate;
                break;

            default:
                status = ReleaseStatus.Stable;
        }

        if (parts[7]) {
            preReleaseVersion = parseInt(parts[7], 10);
        } else {
            preReleaseVersion = 0;
        }

        return new Version(major, minor, patch, status, preReleaseVersion);
    }


    public static validate(version: string): boolean {
        return VERSION_PATTERN.test(version);
    }


    private static components: string[] = ['major', 'minor', 'patch', 'status', 'revision'];
    private static preReleaseStageAliases: string[] = ['alpha', 'beta', 'rc'];


    private _major: number;
    private _minor: number;
    private _patch: number;
    private _status: ReleaseStatus;
    private _revision: number;


    get major(): number {
        return this._major;
    }


    set major(value: number) {
        if (value <= this._major) {
            throw new Error('New major version must be greater than current.');
        }

        this._major = value;
        this._minor = 0;
        this._patch = 0;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    get minor(): number {
        return this._minor;
    }


    set minor(value: number) {
        if (value <= this._minor) {
            throw new Error('New minor version must be greater than current.');
        }

        this._minor = value;
        this._patch = 0;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    get patch(): number {
        return this._patch;
    }


    set patch(value: number) {
        if (value <= this._patch) {
            throw new Error('New patch version must be greater than current.');
        }

        this._patch = value;
        this._status = ReleaseStatus.Stable;
        this._revision = 0;
    }


    get status(): ReleaseStatus {
        return this._status;
    }


    set status(value: ReleaseStatus) {
        if (value !== ReleaseStatus.Stable && value <= this._status) {
            throw new Error('New release stage should be greater than current.');
        }
        
        this._status = value;
        this._revision = 0;
    }


    get revision(): number {
        return this._revision;
    }


    set revision(value: number) {
        if (this._status === ReleaseStatus.Stable) {
            throw new Error('Cannot set pre-release version because release stage is final.');
        }

        if (value <= this._revision) {
            throw new Error('New pre-release version should be greater than current.');
        }

        this._revision = value;
    }


    constructor(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        status: ReleaseStatus = ReleaseStatus.Stable,
        preReleaseVersion: number = 0
    ) {
        this._major = major;
        this._minor = minor;
        this._patch = patch;
        this._status = status;
        this._revision = preReleaseVersion;
    }


    public compare(version: Version): number {
        for (let component of Version.components) {
            let diff: number = this.compareComponents(this[component], version[component]);

            if (diff) {
                return diff;
            }
        }

        return 0;
    }


    public clone(): Version {
        return new Version(this._major, this._minor, this._patch, this._status, this._revision);
    }

    
    public toJSON(): VersionComponents {
        return {
            major: this._major,
            minor: this._minor,
            patch: this._patch,
            status: this._status,
            revision: this._revision
        };
    }
    
    
    public toString(): string {
        let version: string = `${this._major}.${this._minor}.${this._patch}`;
        let preReleaseStageAlias: string = Version.preReleaseStageAliases[this._status];
        
        if (this._status !== ReleaseStatus.Stable) {
            version += `-${preReleaseStageAlias}`;

            if (this._revision > 0) {
                version += `.${this._revision}`;
            }
        }
        
        return version;
    }


    private compareComponents(current: number, other: number): number {
        return current < other ? -1 : current > other ? 1 : 0;
    }
}
