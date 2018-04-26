import {PathPattern} from '../../../file-system/PathPattern';


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

            assert.true(pattern.test('d:\\music\\y5h48h.mp3'));
            assert.true(pattern.test('/home/alex/music/y5h48h.mp3'));
            assert.true(pattern.test('/home/alex/music/1. y5h48h.mp3'));
            assert.true(pattern.test('y5h48h.mp3'));
            assert.false(pattern.test('movie.mp4'));
            assert.false(pattern.test('/bin'));
            assert.false(pattern.test(''));
        });
    });
});
