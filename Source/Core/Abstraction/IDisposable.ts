

export interface IDisposable {
    readonly isDisposed: boolean;
    dispose(): void;
}
