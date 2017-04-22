import Path from '../../../../src/System/IO/Path';


describe.only(`Path`, () => {

    describe(`#directoryName`, () => {
        it(`returns directory name of file system entry`, () => {
            expect(new Path('/').directoryName).toBe('/');
            expect(new Path('/some').directoryName).toBe('/');
            expect(new Path('/some/dir').directoryName).toBe('/some');
            expect(new Path('/some/nested/dir').directoryName).toBe('/some/nested');
            expect(new Path('/some/text/file.txt').directoryName).toBe('/some/text');
        });
    });


    
});