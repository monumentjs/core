import {ReleaseStatus} from './ReleaseStatus';
import {Version} from './Version';
import {IBuilder} from '../Core/Abstraction/IBuilder';


export class VersionBuilder implements IBuilder<Version> {

    public constructor(
        public major: number = 0,
        public minor: number = 0,
        public patch: number = 0,
        public releaseStatus: ReleaseStatus = ReleaseStatus.Alpha,
        public revision: number = 0
    ) {

    }


    public getValue(): Version {
        return new Version(this.major, this.minor, this.patch, this.releaseStatus, this.revision);
    }
}
