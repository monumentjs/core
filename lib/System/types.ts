

export const VERSION_PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;


export enum ReleaseStatus {
    Alpha, Beta, ReleaseCandidate, Stable
}


export type VersionComponents = {
    major: number,
    minor: number,
    patch: number,
    status: ReleaseStatus,
    revision: number
};
