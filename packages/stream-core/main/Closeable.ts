
/**
 * A Closeable is a source or destination of data that can be closed.
 * The close method is invoked to release resources that the reflection is holding (such as open files).
 */
export interface Closeable {
    isClosed: boolean;

    /**
     * Closes this stream and releases any system resources associated with it.
     */
    close(): Promise<void>;
}
