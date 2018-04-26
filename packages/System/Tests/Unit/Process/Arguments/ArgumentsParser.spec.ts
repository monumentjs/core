import {ArgumentsParser} from '../../../..//Process/Arguments/ArgumentsParser';
import {Arguments} from '../../../..//Process/Arguments/Arguments';
import {ReadOnlyCollection} from '@monument/core/Source/Collections/ReadOnlyCollection';


describe(`ArgumentsParser`, () => {
    let parser: ArgumentsParser;


    beforeEach(() => {
        parser = new ArgumentsParser();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of ArgumentsParser`, () => {
            expect(parser).toBeInstanceOf(ArgumentsParser);
        });
    });


    describe(`#parse()`, () => {
        it(`parses arguments string`, () => {
            let args: Arguments = parser.push('node ./ConsoleApplication compile --src . --watch-all');

            assert.equals(args.commands.length, 1);
            assert.equals(args.commands[0], 'compile');

            assert.equals(args.options.length, 2);
            assert.equals(args.options[0].key, '--src');
            assert.equals(args.options[0].value, '.');
            assert.equals(args.options[1].key, '--watch-all');
            assert.true(args.options[1].value);
        });

        it(`has static method that simplifies parsing`, () => {
            let args: Arguments = ArgumentsParser.parse('node npm install ts-kit --save --source npm');

            expect(args).toBeInstanceOf(Arguments);

            assert.equals(args.executablePath, 'node');
            assert.equals(args.mainModulePath, 'npm');

            expect(args.commands).toBeInstanceOf(ReadOnlyCollection);
            assert.equals(args.commands.length, 2);
            assert.equals(args.commands[0], 'install');
            assert.equals(args.commands[1], 'ts-kit');

            assert.equals(args.options.length, 2);
            assert.equals(args.options[0].key, '--save');
            assert.true(args.options[0].isLogical);
            assert.true(args.options[0].value);
            assert.equals(args.options[1].key, '--source');
            assert.false(args.options[1].isLogical);
            assert.equals(args.options[1].value, 'npm');
        });
    });
});
