import FileStream from '../../../../src/System/IO/FileStream';


describe.skip(`FileStream`, () => {
    let instance: FileStream = null;

    beforeEach(async () => {
        instance = await FileStream.open('./fixtures/text-file.txt');
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of FileStream`, () => {
            expect(instance).toBeInstanceOf(FileStream);
        });
    });


    
});