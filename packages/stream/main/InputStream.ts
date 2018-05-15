import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';


export interface InputStream<T> extends AsyncIterable<T> {
    readonly ended: Event<InputStream<T>, EventArgs>;
    readonly isEnded: boolean;

    /**
     * @throws {ClosedStreamException} when attempting to read from a closed stream.
     */
    read(): Promise<T | undefined>;
}
