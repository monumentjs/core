import {Option} from '../../../../../src/System/Process/Arguments/Option';
import {Arguments} from '../../../../../src/System/Process/Arguments/Arguments';
import {ReadOnlyCollection} from '../../../../../src/Core/Collections/ReadOnlyCollection';
import {OptionsCollection} from '../../../../../src/System/Process/Arguments/OptionsCollection';


describe('Arguments', () => {
    let instance: Arguments;


    beforeEach(() => {
        instance = new Arguments(
            'node',
            'npm',
            new ReadOnlyCollection(['' +
                'install',
                'ts-kit'
            ]),
            new OptionsCollection([
                new Option('--save', true),
                new Option('--source', 'npm')
            ])
        );
    });


    describe('#constructor()', () => {
        it('creates new instance', () => {
            expect(instance).toBeInstanceOf(Arguments);

            expect(instance.executablePath).toBe('node');
            expect(instance.mainModulePath).toBe('npm');

            expect(instance.commands).toBeInstanceOf(ReadOnlyCollection);
            expect(instance.commands.length).toBe(2);
            expect(instance.commands[0]).toBe('install');
            expect(instance.commands[1]).toBe('ts-kit');

            expect(instance.options.length).toBe(2);
            expect(instance.options[0].key).toBe('--save');
            expect(instance.options[0].isLogical).toBe(true);
            expect(instance.options[0].value).toBe(true);
            expect(instance.options[1].key).toBe('--source');
            expect(instance.options[1].isLogical).toBe(false);
            expect(instance.options[1].value).toBe('npm');
        });
    });


    describe(`#parse()`, () => {
        it('creates new instance from string', () => {
            instance = Arguments.parse('node npm install ts-kit --save --source npm');

            expect(instance).toBeInstanceOf(Arguments);

            expect(instance.executablePath).toBe('node');
            expect(instance.mainModulePath).toBe('npm');

            expect(instance.commands).toBeInstanceOf(ReadOnlyCollection);
            expect(instance.commands.length).toBe(2);
            expect(instance.commands[0]).toBe('install');
            expect(instance.commands[1]).toBe('ts-kit');

            expect(instance.options.length).toBe(2);
            expect(instance.options[0].key).toBe('--save');
            expect(instance.options[0].isLogical).toBe(true);
            expect(instance.options[0].value).toBe(true);
            expect(instance.options[1].key).toBe('--source');
            expect(instance.options[1].isLogical).toBe(false);
            expect(instance.options[1].value).toBe('npm');
        });
    });


    describe(`#toString()`, () => {
        it(`serializes arguments to string`, () => {
            expect(instance.toString()).toBe('node npm install ts-kit --save --source npm');
        });
    });
});


