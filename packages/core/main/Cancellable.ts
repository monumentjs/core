

export interface Cancellable {
    readonly isCancellable: boolean;
    readonly isCancelled: boolean;

    cancel(): boolean;
}
