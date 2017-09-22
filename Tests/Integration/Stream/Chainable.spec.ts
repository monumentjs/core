import {NumbersReader} from './stubs/NumbersReader';
import {NumbersSerializer} from './stubs/NumbersSerializer';
import {TextWrapper} from './stubs/TextWrapper';
import {TextStorage} from './stubs/TextStorage';
import {StreamSupport} from '../../../Source/Stream/StreamSupport';


describe(`Chainable`, () => {
    let storage: string[];
    let numbersReader: NumbersReader;
    let textWrapper: TextWrapper;
    let numbersSerializer: NumbersSerializer;
    let textStorage: TextStorage;


    beforeEach(() => {
        storage = [];
        numbersReader = new NumbersReader([1, 2, 3]);
        numbersSerializer = new NumbersSerializer();
        textWrapper = new TextWrapper('"', '"');
        textStorage = new TextStorage(storage);

        numbersReader.addReceiver(numbersSerializer);
        numbersSerializer.addReceiver(textWrapper);
        textWrapper.addReceiver(textStorage);
    });


    describe(`constructor()`, () => {
        it(`creates new instance of Chainable`, () => {
            expect(numbersReader).toBeInstanceOf(StreamSupport);
            expect(numbersReader.hasReceiver(numbersSerializer)).toBe(true);
            expect(numbersSerializer.hasReceiver(textWrapper)).toBe(true);
            expect(textWrapper.hasReceiver(textStorage)).toBe(true);
        });
    });


    describe(`addReceiver()`, () => {
        it(`creates pipeline`, async () => {
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(false);

            await expect(numbersReader.read()).resolves.toBe(1);

            expect(storage).toEqual(['"1"']);
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(false);

            await expect(numbersReader.read()).resolves.toBe(2);

            expect(storage).toEqual(['"1"', '"2"']);
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(false);

            await expect(numbersReader.read()).resolves.toBe(3);

            expect(storage).toEqual(['"1"', '"2"', '"3"']);
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(false);

            await expect(numbersReader.read()).resolves.toBeUndefined();

            expect(storage).toEqual(['"1"', '"2"', '"3"']);
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(true);
        });
    });


    describe(`removeAllReceivers()`, () => {
        it(`removes all receivers`, () => {
            expect(() => {
                numbersReader.removeAllReceivers();
            }).not.toThrow();
        });
    });
});
