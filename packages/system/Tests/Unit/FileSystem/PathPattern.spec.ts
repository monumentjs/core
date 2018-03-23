import {PathPattern} from '../../../FileSystem/PathPattern';


describe(`PathPattern`, () => {
    describe(`#constructor()`, () => {
        it(`creates new instance of PathPattern`, () => {
            let pattern: PathPattern = new PathPattern(/\.mp3$/);

            expect(pattern).toBeInstanceOf(PathPattern);
        });
    });


    describe(`#test()`, () => {
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
