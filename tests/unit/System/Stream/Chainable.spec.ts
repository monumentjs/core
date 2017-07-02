import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';
import {Chainable} from '../../../../src/System/Stream/Chainable';
import {NumbersReader} from './stubs/NumbersReader';
import {NumbersSerializer} from './stubs/NumbersSerializer';
import {TextWrapper} from './stubs/TextWrapper';
import {TextStorage} from './stubs/TextStorage';


describe(`class Chainable`, () => {
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


    describe(`#constructor()`, () => {
        it(`creates new instance of Chainable`, () => {
            expect(numbersReader).toBeInstanceOf(Chainable);
            expect(numbersReader.hasReceiver(numbersSerializer)).toBe(true);
            expect(numbersSerializer.hasReceiver(textWrapper)).toBe(true);
            expect(textWrapper.hasReceiver(textStorage)).toBe(true);
        });
    });


    describe(`#addReceiver()`, () => {
        it(`throws if 'receiver' is not defined`, () => {
            expect(() => {
                numbersReader.addReceiver(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                numbersReader.addReceiver(null);
            }).toThrowError(ArgumentNullException);
        });

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

            await expect(numbersReader.read()).resolves.toBe(null);

            expect(storage).toEqual(['"1"', '"2"', '"3"']);
            expect(numbersReader.isPaused).toBe(true);
            expect(numbersReader.isEnded).toBe(true);
        });
    });


    describe(`#removeReceiver()`, () => {
        it(`throws if 'receiver' is not defined`, () => {
            expect(() => {
                numbersReader.removeReceiver(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                numbersReader.removeReceiver(null);
            }).toThrowError(ArgumentNullException);
        });
    });


    describe(`#removeAllReceivers()`, () => {
        it(`removes all receivers`, () => {
            expect(() => {
                numbersReader.removeAllReceivers();
            }).not.toThrow();
        });
    });
});