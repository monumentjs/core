import {PathPattern} from '../../../../src/System/IO/PathPattern';
import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';


describe(`PathPattern`, () => {
    describe(`#constructor()`, () => {
        it(`throws is 'pattern' argument is not defined`, () => {
            expect(() => {
                return new PathPattern(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                return new PathPattern(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`creates new instance of PathPattern`, () => {
            let pattern: PathPattern = new PathPattern(/\.mp3$/);

            expect(pattern).toBeInstanceOf(PathPattern);
        });
    });


    describe(`#test()`, () => {
        it(`throws if path is null or undefined`, () => {
            let pattern: PathPattern = new PathPattern(/\.mp3$/);

            expect(() => {
                pattern.test(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                pattern.test(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`checks path matches pattern`, () => {
            let pattern: PathPattern = new PathPattern(/\.mp3$/);

            expect(pattern.test('d:\\music\\y5h48h.mp3')).toBe(true);
            expect(pattern.test('/home/alex/music/y5h48h.mp3')).toBe(true);
            expect(pattern.test('/home/alex/music/1. y5h48h.mp3')).toBe(true);
            expect(pattern.test('y5h48h.mp3')).toBe(true);
            expect(pattern.test('movie.mp4')).toBe(false);
            expect(pattern.test('/bin')).toBe(false);
            expect(pattern.test('')).toBe(false);
        });
    });
});
