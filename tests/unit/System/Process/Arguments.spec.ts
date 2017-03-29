import Arguments from '../../../../lib/System/Process/Arguments';
import CommandOption from '../../../../lib/System/Process/CommandOption';


describe('Arguments', () => {
    describe('#constructor()', () => {
        it('create new instance', () => {
            let args: Arguments = new Arguments('', 'npm');

            args.commands.add('install');
            args.commands.add('ts-kit');

            args.options.add(new CommandOption('--save', true));
            args.options.add(new CommandOption('--source', 'npm'));

            expect(args.toCommand()).toBe('npm install ts-kit --save --source npm');
        });
    });
});


