export declare const VERSION_PATTERN: RegExp;
export declare enum ReleaseStatus {
    Alpha = 0,
    Beta = 1,
    ReleaseCandidate = 2,
    Stable = 3,
}
export declare type VersionComponents = {
    major: number;
    minor: number;
    patch: number;
    status: ReleaseStatus;
    revision: number;
};
