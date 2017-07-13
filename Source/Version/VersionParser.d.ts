import { Version } from './Version';
import { ReleaseStatus } from './types';
export declare class VersionParser {
    parse(version: string): Version;
    protected getMajor(parts: RegExpExecArray): number;
    protected getMinor(parts: RegExpExecArray): number;
    protected getPatch(parts: RegExpExecArray): number;
    protected getReleaseStatus(parts: RegExpExecArray): ReleaseStatus;
    protected getRevision(parts: RegExpExecArray): number;
}
