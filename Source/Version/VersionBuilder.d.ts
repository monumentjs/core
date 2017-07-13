import { ReleaseStatus } from './types';
import { Version } from './Version';
export declare class VersionBuilder {
    private _version;
    private _forceReleaseStatus;
    private _forcedReleaseStatus;
    readonly version: Version;
    forceReleaseStatus: boolean;
    forcedReleaseStatus: ReleaseStatus;
    constructor(version?: Version);
    setMajor(value: number): void;
    setMinor(value: number): void;
    setPatch(value: number): void;
    setStatus(value: ReleaseStatus): void;
    setRevision(value: number): void;
    nextMajorVersion(): void;
    nextMinorVersion(): void;
    nextPatchVersion(): void;
    nextStatusVersion(): void;
    nextRevisionVersion(): void;
}
