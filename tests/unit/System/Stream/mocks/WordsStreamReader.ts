import {StreamReader} from '../../../../../src/System/Stream/StreamReader';
import {Stream} from '../../../../../src/System/Stream/Stream';


export class WordsStreamReader extends StreamReader<Stream<string>, string> {

    protected async onRead(length: number): Promise<string> {
        await this.openIfNotReady();

        return this.sourceStream.read(length);
    }


    protected async onPause(): Promise<void> {
        // Stub
    }


    protected async onResume(): Promise<void> {
        // Stub
    }


    protected onClose(): Promise<void> {
        return this.sourceStream.close();
    }


    private async openIfNotReady(): Promise<void> {
        if (!this.sourceStream.isReady) {
            await this.sourceStream.open();
        }
    }
}
