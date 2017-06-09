import {ReleaseStatus} from './types';
import {Version} from './Version';
import {assertArgumentNotNull} from '../Assertion/Assert';
import {VersionException} from './VersionException';


export class VersionBuilder {
    private _version: Version;
    private _forceReleaseStatus: boolean = false;
    private _forcedReleaseStatus: ReleaseStatus = ReleaseStatus.Stable;
    // TODO: Apply forced release status

    public get version(): Version {
        return this._version;
    }


    public get forceReleaseStatus(): boolean {
        return this._forceReleaseStatus;
    }


    public set forceReleaseStatus(value: boolean) {
        assertArgumentNotNull('value', value);

        this._forceReleaseStatus = value;
    }


    public get forcedReleaseStatus(): ReleaseStatus {
        return this._forcedReleaseStatus;
    }


    public set forcedReleaseStatus(value: ReleaseStatus) {
        assertArgumentNotNull('value', value);

        this._forcedReleaseStatus = value;
    }


    public constructor(version: Version = new Version()) {
        assertArgumentNotNull('version', version);

        this._version = version;
    }


    public setMajor(value: number): void {
        assertArgumentNotNull('value', value);

        if (value <= this.version.major) {
            throw new VersionException('New major version must be greater than current.');
        }

        this._version = new Version(value);
    }


    public setMinor(value: number): void {
        assertArgumentNotNull('value', value);

        if (value <= this.version.minor) {
            throw new VersionException('New minor version must be greater than current.');
        }

        this._version = new Version(this.version.major, value);
    }


    public setPatch(value: number): void {
        assertArgumentNotNull('value', value);

        if (value <= this.version.patch) {
            throw new VersionException('New patch version must be greater than current.');
        }

        this._version = new Version(this.version.major, this.version.minor, value);
    }


    public setStatus(value: ReleaseStatus): void {
        assertArgumentNotNull('value', value);

        if (value !== ReleaseStatus.Stable && value <= this.version.status) {
            throw new VersionException('New release stage should be greater than current.');
        }

        this._version = new Version(this.version.major, this.version.minor, this.version.patch, value);
    }


    public setRevision(value: number): void {
        assertArgumentNotNull('value', value);

        if (this.version.status === ReleaseStatus.Stable) {
            throw new VersionException('Cannot set pre-release version because release stage is final.');
        }

        if (value <= this.version.revision) {
            throw new VersionException('New pre-release version should be greater than current.');
        }

        this._version = new Version(
            this.version.major, this.version.minor, this.version.patch, this.version.status, value
        );
    }


    public nextMajorVersion(): void {
        this.setMajor(this.version.major + 1);
    }


    public nextMinorVersion(): void {
        this.setMinor(this.version.minor + 1);
    }


    public nextPatchVersion(): void {
        this.setPatch(this.version.patch + 1);
    }


    public nextStatusVersion(): void {
        let newStatus: ReleaseStatus = this.version.status + 1;

        if (newStatus > ReleaseStatus.Stable) {
            this.setPatch(this.version.patch + 1);

            return;
        }

        this.setStatus(newStatus);
    }


    public nextRevisionVersion(): void {
        this.setRevision(this.version.revision + 1);
    }
}
