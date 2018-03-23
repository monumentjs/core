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

            expect(args.commands.length).toBe(1);
            expect(args.commands[0]).toBe('compile');

            expect(args.options.length).toBe(2);
            expect(args.options[0].key).toBe('--src');
            expect(args.options[0].value).toBe('.');
            expect(args.options[1].key).toBe('--watch-all');
            expect(args.options[1].value).toBe(true);
        });

        it(`has static method that simplifies parsing`, () => {
            let args: Arguments = ArgumentsParser.parse('node npm install ts-kit --save --source npm');

            expect(args).toBeInstanceOf(Arguments);

            expect(args.executablePath).toBe('node');
            expect(args.mainModulePath).toBe('npm');

            expect(args.commands).toBeInstanceOf(ReadOnlyCollection);
            expect(args.commands.length).toBe(2);
            expect(args.commands[0]).toBe('install');
            expect(args.commands[1]).toBe('ts-kit');

            expect(args.options.length).toBe(2);
            expect(args.options[0].key).toBe('--save');
            expect(args.options[0].isLogical).toBe(true);
            expect(args.options[0].value).toBe(true);
            expect(args.options[1].key).toBe('--source');
            expect(args.options[1].isLogical).toBe(false);
            expect(args.options[1].value).toBe('npm');
        });
    });
});
