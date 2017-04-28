import {WordsStream, WORDS_STREAM_TEST_DATA} from './mocks/WordsStream';
import {Stream} from '../../../../src/System/Stream/Stream';
import {StreamEvent} from '../../../../src/System/Stream/StreamEvent';


describe(`Stream`, () => {
    let wordsStream: WordsStream = null;


    beforeEach(() => {
        expect(() => {
            wordsStream = new WordsStream(WORDS_STREAM_TEST_DATA);
        }).not.toThrow();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of Stream class`, () => {
            expect(wordsStream).toBeInstanceOf(Stream);
        });
    });


    describe(`#open()`, () => {
        it(`prepares stream for usage`, async () => {
            expect(wordsStream.isReady).toEqual(false);

            await wordsStream.open();

            expect(wordsStream.isReady).toEqual(true);
        });


        it(`dispatches 'ready' event after stream has been opened`, async () => {
            let onReady = jest.fn();

            wordsStream.addEventListener(StreamEvent.READY, onReady);

            expect(onReady).toHaveBeenCalledTimes(0);

            await wordsStream.open();

            expect(onReady).toHaveBeenCalledTimes(1);
        });
    });


    describe(`#close()`, () => {
        it(`throws when attempting to close stream that is not opened`, async () => {
            let error: Error;
            let onClose = jest.fn();
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.CLOSE, onClose);
            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            expect(wordsStream.isClosed).toEqual(false);
            expect(wordsStream.isReady).toEqual(false);

            try {
                await wordsStream.close();
            } catch (ex) {
                error = ex;
            }

            expect(wordsStream.isClosed).toEqual(false);
            expect(wordsStream.isReady).toEqual(false);

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual('Stream is not ready.');
            expect(onClose).toHaveBeenCalledTimes(0);
            expect(onError).toHaveBeenCalledTimes(1);
        });


        it(`close the stream`, async () => {
            let onClose = jest.fn();

            wordsStream.addEventListener(StreamEvent.CLOSE, onClose);

            expect(wordsStream.isClosed).toEqual(false);
            expect(onClose).toHaveBeenCalledTimes(0);

            await wordsStream.open();
            await wordsStream.close();

            expect(wordsStream.isClosed).toEqual(true);
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });


    describe(`#read()`, () => {
        it(`throws when stream is not readable`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);
            Stream.setReadable(wordsStream, false);

            expect(wordsStream.canRead).toEqual(false);

            await wordsStream.open();

            try {
                await wordsStream.read(1);
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(`Stream is not readable.`);
            expect(onError).toHaveBeenCalledTimes(1);
        });


        it(`throws when stream is not ready`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            try {
                await wordsStream.read(1);
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(`Stream is not ready.`);
            expect(onError).toHaveBeenCalledTimes(1);
        });


        it(`reads new portion of data`, async () => {
            let word: string;

            await wordsStream.open();

            word = await wordsStream.read(1);

            expect(word).toEqual(WORDS_STREAM_TEST_DATA[0]);
            expect(wordsStream.position).toEqual(1);
        });


        it(`ends stream when all data was read`, async () => {
            let words: string[] = [];
            let word: string;
            let onEnd = jest.fn();
            let onClose = jest.fn();
            let iterations: number = 0;

            wordsStream.addEventListener(StreamEvent.END, onEnd);
            wordsStream.addEventListener(StreamEvent.CLOSE, onClose);

            await wordsStream.open();

            do {
                word = await wordsStream.read(1);
                iterations += 1;

                if (word !== undefined) {
                    words.push(word);
                }
            } while (word !== undefined);

            expect(iterations).toEqual(WORDS_STREAM_TEST_DATA.length + 1);
            expect(words).toEqual(WORDS_STREAM_TEST_DATA);
            expect(word).toBeUndefined();
            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledTimes(1);
            expect(wordsStream.position).toEqual(0);
            expect(wordsStream.isClosed).toEqual(true);
        });


        it(`throws when attempting to read from closed (ended) stream`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            await wordsStream.open();

            await wordsStream.seek(WORDS_STREAM_TEST_DATA.length);

            expect(wordsStream.isClosed).toEqual(false);

            expect(await wordsStream.read(1)).toBeUndefined();

            expect(wordsStream.isClosed).toEqual(true);

            try {
                await wordsStream.read(1);
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual('Stream is closed.');
            expect(onError).toHaveBeenCalledTimes(1);
        });
    });


    describe(`#write()`, () => {
        it(`throws when stream is not writable`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            Stream.setWritable(wordsStream, false);

            expect(wordsStream.canWrite).toEqual(false);

            await wordsStream.open();

            try {
                await wordsStream.write('six');
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(`Stream is not writable.`);
            expect(onError).toHaveBeenCalledTimes(1);
        });


        it(`throws when stream is not ready`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            try {
                await wordsStream.write('six');
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(`Stream is not ready.`);
            expect(onError).toHaveBeenCalledTimes(1);
        });


        it(`writes new portion of data and offsets by data size`, async () => {
            let onSeek = jest.fn();

            wordsStream.addEventListener(StreamEvent.SEEK, onSeek);

            await wordsStream.open();

            expect(wordsStream.position).toEqual(0);
            expect(wordsStream.length).toEqual(5);

            await wordsStream.seek(wordsStream.length);

            expect(onSeek).toHaveBeenCalledTimes(1);

            await wordsStream.write('six');

            expect(wordsStream.position).toEqual(6);
            expect(wordsStream.length).toEqual(6);
            expect(onSeek).toHaveBeenCalledTimes(1);
        });


        it(`throws when attempting to write to closed stream`, async () => {
            let error: Error;
            let onError = jest.fn();

            wordsStream.addEventListener(StreamEvent.ERROR, onError);

            await wordsStream.open();
            await wordsStream.close();

            expect(wordsStream.isClosed).toEqual(true);

            try {
                await wordsStream.write('six');
            } catch (ex) {
                error = ex;
            }

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual('Stream is closed.');
            expect(onError).toHaveBeenCalledTimes(1);
        });
    });
});
