import List from '../../../Core/Collections/List';
import CommandOption from './CommandOption';
import StringBuilder from '../../Text/StringBuilder';
import ArgumentsParser from './ArgumentsParser';


// Recommended format:
// <executable> <main_module> [<commands> [<--option_name> <option_value>]]
//
// Example:
// npm install async --save-dev
//
// Means:
// executable === 'npm'
// commands[0] === 'install'
// commands[1] === 'async'
// options['saveDev'] === true

export default class Arguments {
    public static fromCurrentProcess(): Arguments {
        let commandLineArgsParser: ArgumentsParser = new ArgumentsParser();
        let commandLineArgsString: string = process.argv.map((arg: string): string => {
            if (/\s/.test(arg)) {
                return `"${arg}"`;
            } else {
                return arg;
            }
        }).join(' ');
        
        commandLineArgsParser.parse(commandLineArgsString);
        
        return commandLineArgsParser.value;
    }
    
    
    private _executablePath: string;
    private _mainModulePath: string;
    private _commands: List<string> = new List<string>();
    private _options: List<CommandOption> = new List<CommandOption>();
    
    
    public get executablePath(): string {
        return this._executablePath;
    }
    
    
    public set executablePath(value: string) {
        this._executablePath = value;
    }
    
    
    public get mainModulePath(): string {
        return this._mainModulePath;
    }
    
    
    public set mainModulePath(value: string) {
        this._mainModulePath = value;
    }
    
    
    public get commands(): List<string> {
        return this._commands;
    }
    
    
    public get options(): List<CommandOption> {
        return this._options;
    }


    public constructor(
        executablePath: string = '',
        mainModulePath: string = ''
    ) {
        this._executablePath = executablePath;
        this._mainModulePath = mainModulePath;
    }
    
    
    public toCommand(): string {
        let commandBuilder: StringBuilder = new StringBuilder();
        
        commandBuilder.append(`"${this._executablePath}" "${this._mainModulePath}"`);
        
        for (let command of this._commands) {
            commandBuilder.append(` ${command}`);
        }
        
        for (let option of this._options) {
            commandBuilder.append(` ${option.toString()}`);
        }
        
        return commandBuilder.toString();
    }
}
