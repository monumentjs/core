import {Version} from './Version';
import {ReleaseStatus, VERSION_PATTERN} from './types';
import {Singleton} from '../DI/Decorators/Singleton';
import {VersionValidator} from './VersionValidator';
import {UnitGetter} from '../DI/Decorators/UnitGetter';


@Singleton()
export class VersionParser {
    @UnitGetter(VersionValidator)
    private readonly validator: VersionValidator;


    public parse(version: string): Version {
        this.validator.validate(version);

        let major: number;
        let minor: number;
        let patch: number;
        let releaseStatus: ReleaseStatus;
        let revision: number;
        let parts: RegExpExecArray = VERSION_PATTERN.exec(version);

        major = this.getMajor(parts);
        minor = this.getMinor(parts);
        patch = this.getPatch(parts);
        releaseStatus = this.getReleaseStatus(parts);
        revision = this.getRevision(parts);

        return new Version(major, minor, patch, releaseStatus, revision);
    }


    private getMajor(parts: RegExpExecArray): number {
        return parseInt(parts[1], 10);
    }


    private getMinor(parts: RegExpExecArray): number {
        return parseInt(parts[2], 10);
    }


    private getPatch(parts: RegExpExecArray): number {
        return parseInt(parts[3], 10);
    }


    private getReleaseStatus(parts: RegExpExecArray): ReleaseStatus {
        switch (parts[5]) {
            case 'alpha':
                return ReleaseStatus.Alpha;

            case 'beta':
                return ReleaseStatus.Beta;

            case 'rc':
                return ReleaseStatus.ReleaseCandidate;

            default:
                return ReleaseStatus.Stable;
        }
    }


    private getRevision(parts: RegExpExecArray): number {
        if (parts[7]) {
            return parseInt(parts[7], 10);
        } else {
            return 0;
        }
    }
}
