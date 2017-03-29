import WordsStream from './stubs/WordsStream';
import {Stream} from '../../../../lib/System/Stream/Stream';
import StreamEvent from '../../../../lib/System/Stream/StreamEvent';
import {WORDS_STREAM_TEST_DATA} from './stubs/WordsStream';
import TextTransformStream from './stubs/TextTransformStream';


describe(`Stream`, () => {
    let wordsStream: WordsStream = null;


    beforeEach(() => {
        expect(() => {
            wordsStream = new WordsStream();
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
            Stream.writeOnly(wordsStream);

            expect(wordsStream.canRead).toEqual(false);

            await wordsStream.open();

            try {
                await wordsStream.read();
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
                await wordsStream.read();
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

            word = await wordsStream.read();

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
                word = await wordsStream.read();
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

            await wordsStream.read();

            expect(wordsStream.isClosed).toEqual(true);

            try {
                await wordsStream.read();
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
            Stream.readOnly(wordsStream);

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
            expect(onSeek).toHaveBeenCalledTimes(2);
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


    describe(`#pipe()`, () => {
        let transformStream: TextTransformStream;


        beforeEach(async () => {
            transformStream = TextTransformStream.toLowerCase();
        });


        it(`throws if destination stream is not writable`, () => {
            Stream.readOnly(transformStream);

            expect(() => {
                wordsStream.pipe(transformStream);
            }).toThrowError('Destination stream is not writable.');
        });


        it(`dispatches 'pipe' event on destination stream`, () => {
            let pipeEvent: StreamEvent;
            let onPipe = jest.fn();
            
            transformStream.addEventListener(StreamEvent.PIPE, onPipe);
            
            wordsStream.pipe(transformStream);
            
            pipeEvent = onPipe.mock.calls[0][0];
            
            expect(onPipe).toHaveBeenCalledTimes(1);
            expect(pipeEvent).toBeInstanceOf(StreamEvent);
            expect(pipeEvent.sourceStream).toEqual(wordsStream);
            expect(pipeEvent.destinationStream).toEqual(transformStream);
        });


        it(`returns destination stream`, () => {
            expect(wordsStream.pipe(transformStream)).toEqual(transformStream);
        });
    });


    describe(`#unpipe()`, () => {
        let transformStream: TextTransformStream;


        beforeEach(async () => {
            transformStream = TextTransformStream.toLowerCase();
        });


        it(`removes destination stream from pipe chain`, () => {
            wordsStream.pipe(transformStream);
            wordsStream.unpipe(transformStream);
        });


        it(`dispatches 'unpipe' event on destination stream`, () => {
            let unPipeEvent: StreamEvent;
            let onUnPipe = jest.fn();

            transformStream.addEventListener(StreamEvent.UNPIPE, onUnPipe);

            wordsStream.pipe(transformStream);
            wordsStream.unpipe(transformStream);

            unPipeEvent = onUnPipe.mock.calls[0][0];

            expect(onUnPipe).toHaveBeenCalledTimes(1);
            expect(unPipeEvent).toBeInstanceOf(StreamEvent);
            expect(unPipeEvent.sourceStream).toEqual(wordsStream);
            expect(unPipeEvent.destinationStream).toEqual(transformStream);
        });
    });


    describe(`#resume()`, () => {
        let upperCaseTransformStream: TextTransformStream;
        let lowerCaseTransformStream: TextTransformStream;


        beforeEach(async () => {
            upperCaseTransformStream = TextTransformStream.toUpperCase();
            lowerCaseTransformStream = TextTransformStream.toLowerCase();
            await upperCaseTransformStream.open();
            await lowerCaseTransformStream.open();
        });

        // TODO: test 'read' and 'write' calls
        it(`turns stream to flowing mode`, async () => {
            let onEnd = jest.fn();
            let writeMethodSpy = spyOn(upperCaseTransformStream, 'write');

            wordsStream.addEventListener(StreamEvent.END, onEnd);

            await wordsStream.open();

            wordsStream.pipe(upperCaseTransformStream);

            await wordsStream.resume();

            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(writeMethodSpy).toHaveBeenCalledTimes(WORDS_STREAM_TEST_DATA.length);
        });
    });

});
