
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Cancellable {
    readonly isCancelled: boolean;

    cancel(): boolean;
}
