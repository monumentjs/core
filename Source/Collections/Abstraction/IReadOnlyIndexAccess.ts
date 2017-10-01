

export interface IReadOnlyIndexAccess<T> {
    readonly [index: number]: T | undefined;
}
