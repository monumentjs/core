import {Version} from './Version';
import {ReleaseStatus} from './ReleaseStatus';
import {Lazy} from '../stereotype/configuration/Lazy';
import {Singleton} from '../stereotype/Singleton';
import {ParsingException} from '../text/parser/ParsingException';


@Lazy
@Singleton
export class VersionParser {
    public static readonly PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;


    public parse(version: string): Version {
        if (VersionParser.PATTERN.test(version) === false) {
            throw new ParsingException(`Invalid version format.`);
        }

        const parts: RegExpExecArray = VersionParser.PATTERN.exec(version) as RegExpExecArray;
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
                return ReleaseStatus.ALPHA;

            case 'beta':
                return ReleaseStatus.BETA;

            case 'rc':
                return ReleaseStatus.RELEASE_CANDIDATE;

            default:
                return ReleaseStatus.STABLE;
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
