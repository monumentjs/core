import {StreamReader} from '../../../../../src/System/Stream/StreamReader';
import {AsyncResult} from '../../../../../src/Core/types';
import {Stream} from '../../../../../src/System/Stream/Stream';


export class WordsStreamReader extends StreamReader<Stream<string>, string> {

    protected async onRead(length: number): AsyncResult<string> {
        await this.openIfNotReady();

        return this.sourceStream.read(length);
    }


    protected async onPause(): AsyncResult<void> {
        // Stub
    }


    protected async onResume(): AsyncResult<void> {
        // Stub
    }


    protected onClose(): AsyncResult<void> {
        return this.sourceStream.close();
    }


    private async openIfNotReady(): AsyncResult<void> {
        if (!this.sourceStream.isReady) {
            await this.sourceStream.open();
        }
    }
}
