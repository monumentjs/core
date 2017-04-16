import Version from './Version';
import {ReleaseStatus, VERSION_PATTERN} from './types';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import ParsingException from '../../Text/Parsing/ParsingException';


export default class VersionParser {
    public parse(version: string): Version {
        assertArgumentNotNull('version', version);

        let major: number;
        let minor: number;
        let patch: number;
        let releaseStatus: ReleaseStatus;
        let revision: number;
        let parts: RegExpExecArray = VERSION_PATTERN.exec(version);
    
        if (!parts) {
            throw new ParsingException(`Given value is not a valid version.`);
        }
    
        major = this.getMajor(parts);
        minor = this.getMinor(parts);
        patch = this.getPatch(parts);
        releaseStatus = this.getReleaseStatus(parts);
        revision = this.getRevision(parts);
    
        return new Version(major, minor, patch, releaseStatus, revision);
    }
    
    
    protected getMajor(parts: RegExpExecArray): number {
        return parseInt(parts[1], 10);
    }
    
    
    protected getMinor(parts: RegExpExecArray): number {
        return parseInt(parts[2], 10);
    }
    
    
    protected getPatch(parts: RegExpExecArray): number {
        return parseInt(parts[3], 10);
    }
    
    
    protected getReleaseStatus(parts: RegExpExecArray): ReleaseStatus {
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
    
    
    protected getRevision(parts: RegExpExecArray): number {
        if (parts[7]) {
            return parseInt(parts[7], 10);
        } else {
            return 0;
        }
    }
}
