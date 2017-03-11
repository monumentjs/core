

export const VERSION_PATTERN: RegExp = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;

// TODO: wrap into read-only Collection or Set

export const VERSION_COMPONENTS: string[] = ['major', 'minor', 'patch', 'status', 'revision'];
export const VERSION_PRE_RELEASE_STAGES: string[] = ['alpha', 'beta', 'rc'];


export enum ReleaseStatus {
    Alpha, Beta, ReleaseCandidate, Stable
}

