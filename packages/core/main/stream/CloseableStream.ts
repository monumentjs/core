/**
 * A Closeable is a source or destination of data that can be closed.
 * The close method is invoked to release resources that the reflection is holding (such as open files).
 */
import {EventArgs} from '../events/EventArgs';
import {Event} from '../events/Event';


export interface CloseableStream {
    readonly closed: Event<CloseableStream, EventArgs>;
    readonly isClosed: boolean;

    /**
     * Closes this stream and releases any system resources associated with it.
     */
    close(): Promise<void> | void;
}
