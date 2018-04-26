import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {Closeable} from './Closeable';
import {OutputStream} from './OutputStream';


export interface InputStream<T> extends Closeable {
    readonly ended: Event<InputStream<T>, EventArgs>;
    readonly isEnded: boolean;
    read(): Promise<T | undefined>;
    copyTo(output: OutputStream<T>): Promise<void>;
}
