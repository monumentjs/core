import { ArrayList } from '../../../../../collections/main/ArrayList';
import { Arguments } from '../../../../Process/Arguments/Arguments';
import { Option } from '../../../..//Process/Arguments/Option';


describe('Arguments', () => {
    let instance: Arguments;


    beforeEach(() => {
        instance = new Arguments(
            'node',
            'npm',
            new ArrayList([
                'install',
                'ts-kit'
            ]),
            new OptionsCollection([
                new Option('--save', 'true'),
                new Option('--source', 'npm')
            ])
        );
    });


    describe('#constructor()', () => {
        it('creates new instance', () => {
            expect(instance).toBeInstanceOf(Arguments);

            expect(instance.executablePath).toBe('node');
            expect(instance.mainModulePath).toBe('npm');

            expect(instance.commands.length).toBe(2);
            expect(instance.commands[0]).toBe('install');
            expect(instance.commands[1]).toBe('ts-kit');

            expect(instance.options.length).toBe(2);
            expect((instance.options[0] as Option).key).toBe('--save');
            expect((instance.options[0] as Option).isLogical).toBe(true);
            expect((instance.options[0] as Option).value).toBe(true);
            expect((instance.options[1] as Option).key).toBe('--source');
            expect((instance.options[1] as Option).isLogical).toBe(false);
            expect((instance.options[1] as Option).value).toBe('npm');
        });
    });


    describe(`#toString()`, () => {
        it(`serializes arguments to string`, () => {
            expect(instance.toString()).toBe('node npm install ts-kit --save --source npm');
        });
    });
});
