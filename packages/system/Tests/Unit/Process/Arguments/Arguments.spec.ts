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

            assert.equals(instance.executablePath, 'node');
            assert.equals(instance.mainModulePath, 'npm');

            assert.equals(instance.commands.length, 2);
            assert.equals(instance.commands[0], 'install');
            assert.equals(instance.commands[1], 'ts-kit');

            assert.equals(instance.options.length, 2);
            assert.equals((instance.options[0] as Option).key, '--save');
            assert.true((instance.options[0] as Option).isLogical);
            assert.true((instance.options[0] as Option).value);
            assert.equals((instance.options[1] as Option).key, '--source');
            assert.false((instance.options[1] as Option).isLogical);
            assert.equals((instance.options[1] as Option).value, 'npm');
        });
    });


    describe(`#toString()`, () => {
        it(`serializes arguments to string`, () => {
            assert.equals(instance.toString(), 'node npm install ts-kit --save --source npm');
        });
    });
});
