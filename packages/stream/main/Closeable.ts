import {EventArgs} from '@monument/events/main/EventArgs';
import {Event} from '@monument/events/main/Event';


/**
 * A Closeable is a source or destination of data that can be closed.
 * The close method is invoked to release resources that the reflection is holding (such as open files).
 */
export interface Closeable {
    readonly closed: Event<Closeable, EventArgs>;
    readonly isClosed: boolean;

    /**
     * Closes this stream and releases any system resources associated with it.
     */
    close(): Promise<void> | void;
}
