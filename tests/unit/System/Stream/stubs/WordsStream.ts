import {Stream} from '../../../../../src/System/Stream/Stream';


export const WORDS_STREAM_TEST_DATA = ['One', 'Two', 'Three', 'Four', 'Five'];
export const WORD_SEEK_OFFSET = 1;


export class WordsStream extends Stream<string> {

    private _words: string[] = Array.of(...WORDS_STREAM_TEST_DATA);

    
    public get length(): number {
        return this._words.length;
    }


    protected async onOpen(): Promise<void> {
        // No implementation
    }


    protected async onClose(): Promise<void> {
        // No implementation
    }


    protected async onSeek(position: number): Promise<number> {
        return position;
    }


    protected async onPause(): Promise<void> {
        // No implementation
    }


    protected async onResume(): Promise<void> {
        // No implementation
    }


    protected async onFlush(): Promise<void> {
        // No implementation
    }


    protected async onDispose(): Promise<void> {
        // No implementation
    }


    protected async onRead(): Promise<string> {
        let word: string;
        
        if (this.position < this.length) {
            word = this._words[this.position];
            
            await this.seek(this.position + 1);
        }

        return word;
    }

    
    protected async onWrite(word: string): Promise<number> {
        this._words.splice(this._position, WORD_SEEK_OFFSET, word);
        
        return WORD_SEEK_OFFSET;
    }
}