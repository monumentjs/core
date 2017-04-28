import {ArgumentsParser} from '../../../../../src/System/Process/Arguments/ArgumentsParser';
import {Arguments} from '../../../../../src/System/Process/Arguments/Arguments';


describe(`ArgumentsParser`, () => {
    let instance: ArgumentsParser = null;


    beforeEach(() => {
        instance = new ArgumentsParser();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of ArgumentsParser`, () => {
            expect(instance).toBeInstanceOf(ArgumentsParser);
        });
    });


    describe(`#parse()`, () => {
        it(`parses arguments string`, () => {
            let args: Arguments;

            instance.parse('node ./ConsoleApplication compile --src . --watch-all');

            args = instance.value;

            expect(args.commands.length).toBe(1);
            expect(args.commands[0]).toBe('compile');

            expect(args.options.length).toBe(2);
            expect(args.options[0].key).toBe('--src');
            expect(args.options[0].value).toBe('.');
            expect(args.options[1].key).toBe('--watch-all');
            expect(args.options[1].value).toBe(true);
        });
    });
});