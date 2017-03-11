import Stream from '../../../../lib/System/Stream/Stream';
import {AsyncResult} from '../../../../lib/Core/types';
import {wait} from '../../../../lib/Core/Async/Utils';


export const WORDS_STREAM_TEST_DATA = ['One', 'Two', 'Three', 'Four', 'Five'];


export default class WordsStream extends Stream<string> {

    // PUBLIC STATIC METHODS

    /**
     * Makes words stream only readable. All writing operations will fail.
     * @param wordStream
     */
    public static makeOnlyReadable(wordStream: WordsStream) {
        wordStream._canRead = true;
        wordStream._canWrite = false;
    }

    /**
     * Makes words stream only writable. All reading operations will fail.
     * @param wordStream
     */
    public static makeOnlyWritable(wordStream: WordsStream) {
        wordStream._canRead = false;
        wordStream._canWrite = true;
    }


    // PRIVATE PROPERTIES


    private _words: string[] = Array.of(...WORDS_STREAM_TEST_DATA);


    // PUBLIC GETTERS AND SETTERS

    
    public get length(): number {
        return this._words.length;
    }


    // PROTECTED METHODS

    
    protected async onRead(): AsyncResult<string> {
        let word: string;
        
        if (this.position < this.length) {
            word = this._words[this.position];
            
            await this.seek(this.position + 1);
        }

        await wait(Math.random() * 10);
        
        return word;
    }

    
    protected async onWrite(word: string): AsyncResult<void> {
        await wait(Math.random() * 10);
        
        this._words.splice(this._position, 1, word);
        
        await this.seek(this.position + 1);
    }
}