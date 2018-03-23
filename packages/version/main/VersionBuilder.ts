import {ReleaseStatus} from './ReleaseStatus';
import {Version} from './Version';


export class VersionBuilder {
    public major: number;
    public minor: number;
    public patch: number;
    public releaseStatus: ReleaseStatus;
    public revision: number;


    public constructor(
        major: number = 0,
        minor: number = 0,
        patch: number = 0,
        releaseStatus: ReleaseStatus = ReleaseStatus.Alpha,
        revision: number = 0
    ) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.releaseStatus = releaseStatus;
        this.revision = revision;
    }


    public build(): Version {
        return new Version(
            this.major,
            this.minor,
            this.patch,
            this.releaseStatus,
            this.revision
        );
    }
}
