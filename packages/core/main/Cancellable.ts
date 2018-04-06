

export interface Cancellable {
    readonly isCancelled: boolean;

    cancel(): boolean;
}
