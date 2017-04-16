import {StreamReader} from '../../../../src/System/Stream/StreamReader';
import WordsStreamReader from './mocks/WordsStreamReader';
import WordsStream, {WORDS_STREAM_TEST_DATA} from './mocks/WordsStream';
import WordsTransformWriter from './mocks/WordsTransformWriter';
import TextTransform from '../../../../src/Core/Text/TextTransform';
import StreamReaderEvent from '../../../../src/System/Stream/StreamReaderEvent';
import ArgumentNullException from '../../../../src/Core/Exceptions/ArgumentNullException';
import StreamWriterEvent from '../../../../src/System/Stream/StreamWriterEvent';
import Exception from '../../../../src/Core/Exceptions/Exception';


describe(`StreamReader`, () => {
    let inputStream: WordsStream = null;
    let outputStream: WordsStream = null;
    let reader: WordsStreamReader = null;
    let upperCaseWriter: WordsTransformWriter = null;
    let lowerCaseWriter: WordsTransformWriter = null;


    beforeEach(() => {
        expect(() => {
            inputStream = new WordsStream(WORDS_STREAM_TEST_DATA);
            outputStream = new WordsStream();
            reader = new WordsStreamReader(inputStream);
            upperCaseWriter = new WordsTransformWriter(outputStream, TextTransform.toUpperCase);
            lowerCaseWriter = new WordsTransformWriter(outputStream, TextTransform.toLowerCase);
        }).not.toThrow();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of StreamReader`, () => {
            expect(reader).toBeInstanceOf(StreamReader);
        });
    });


    describe(`#read()`, () => {
        it(`throws if 'length' argument is not defined`, async () => {
            let exception: Exception;

            try {
                await reader.read(undefined);
            } catch (ex) {
                exception = ex;
            }

            expect(exception).toBeInstanceOf(ArgumentNullException);
        });

        it(`throws if 'length' argument is null`, async () => {
            let exception: Exception;

            try {
                await reader.read(null);
            } catch (ex) {
                exception = ex;
            }

            expect(exception).toBeInstanceOf(ArgumentNullException);
        });
    });


    describe(`#pipe()`, () => {
        it(`dispatches 'pipe' event on destination stream`, () => {
            let pipeEvent: StreamWriterEvent;
            let onPipe = jest.fn();

            upperCaseWriter.addEventListener(StreamWriterEvent.PIPE, onPipe);

            reader.pipe(upperCaseWriter);

            pipeEvent = onPipe.mock.calls[0][0];

            expect(onPipe).toHaveBeenCalledTimes(1);
            expect(pipeEvent).toBeInstanceOf(StreamWriterEvent);
            expect(pipeEvent.source).toEqual(reader);
            expect(pipeEvent.target).toEqual(upperCaseWriter);
        });


        it(`returns destination stream`, () => {
            expect(reader.pipe(upperCaseWriter)).toEqual(upperCaseWriter);
        });
    });


    describe(`#unpipe()`, () => {
        it(`removes destination stream from pipe chain`, () => {
            reader.pipe(upperCaseWriter);
            reader.unpipe(upperCaseWriter);
        });


        it(`dispatches 'unpipe' event on destination stream`, () => {
            let unPipeEvent: StreamWriterEvent;
            let onUnPipe = jest.fn();

            upperCaseWriter.addEventListener(StreamWriterEvent.UNPIPE, onUnPipe);

            reader.pipe(upperCaseWriter);
            reader.unpipe(upperCaseWriter);

            unPipeEvent = onUnPipe.mock.calls[0][0];

            expect(onUnPipe).toHaveBeenCalledTimes(1);
            expect(unPipeEvent).toBeInstanceOf(StreamWriterEvent);
            expect(unPipeEvent.source).toEqual(reader);
            expect(unPipeEvent.target).toEqual(upperCaseWriter);
        });
    });


    describe(`#resume()`, () => {
        it(`turns stream to flowing mode`, async () => {
            let onEnd = jest.fn();
            let writeMethodSpy = spyOn(upperCaseWriter, 'write');

            reader.addEventListener(StreamReaderEvent.END, onEnd);

            reader.pipe(upperCaseWriter);

            await reader.resume();

            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(writeMethodSpy).toHaveBeenCalledTimes(WORDS_STREAM_TEST_DATA.length);
        });
    });
});