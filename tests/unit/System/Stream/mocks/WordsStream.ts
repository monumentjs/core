import {Stream} from '../../../../../src/System/Stream/Stream';


export const WORDS_STREAM_TEST_DATA = ['One', 'Two', 'Three', 'Four', 'Five'];
export const WORD_SEEK_OFFSET = 1;


export class WordsStream extends Stream<string> {
    private _words: string[];


    public constructor(words: string[] = []) {
        super();

        this._words = words;
    }

    
    public get length(): number {
        return this._words.length;
    }


    protected async onOpen(): Promise<void> {
        // Stub
    }


    protected async onClose(): Promise<void> {
        // Stub
    }


    protected async onSeek(position: number): Promise<number> {
        return position;
    }


    protected async onFlush(): Promise<void> {
        // Stub
    }


    protected async onDispose(): Promise<void> {
        // Stub
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