import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';
import {ParsingException} from '@monument/text-parser-core/main/ParsingException';
import {Version} from './Version';
import {ReleaseStatus} from './ReleaseStatus';


export class VersionParser {
    @GetInstance()
    public static readonly instance: VersionParser;


    private constructor() {}


    public parse(version: string): Version {
        if (Version.PATTERN.test(version) === false) {
            throw new ParsingException(`Invalid version format.`);
        }

        const parts: RegExpExecArray = Version.PATTERN.exec(version) as RegExpExecArray;
        const major: number = this.getMajor(parts);
        const minor: number = this.getMinor(parts);
        const patch: number = this.getPatch(parts);
        const releaseStatus: ReleaseStatus = this.getReleaseStatus(parts);
        const revision: number = this.getRevision(parts);

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
