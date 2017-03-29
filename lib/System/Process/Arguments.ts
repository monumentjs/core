import ArgumentsParser from './ArgumentsParser';
import CommandOption from './CommandOption';
import List from '../../Core/Collections/List';
import {assertArgumentNotNull} from '../../Assertion/Assert';


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
    public static getCurrentProcessArguments(): Arguments {
        let argumentsParser: ArgumentsParser = new ArgumentsParser();
        let commandLineArgsString: string = process.argv.map((arg: string): string => {
            if (/\s/.test(arg)) {
                return `"${arg}"`;
            }

            return arg;
        }).join(' ');

        argumentsParser.parse(commandLineArgsString);

        return argumentsParser.value;
    }


    private _executablePath: string;
    private _mainModulePath: string;
    private _commands: List<string> = new List<string>();
    private _options: List<CommandOption> = new List<CommandOption>();
    
    
    public get executablePath(): string {
        return this._executablePath;
    }
    
    
    public set executablePath(value: string) {
        assertArgumentNotNull('value', value);

        this._executablePath = value;
    }
    
    
    public get mainModulePath(): string {
        return this._mainModulePath;
    }
    
    
    public set mainModulePath(value: string) {
        assertArgumentNotNull('value', value);

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
        assertArgumentNotNull('executablePath', executablePath);
        assertArgumentNotNull('mainModulePath', mainModulePath);

        this._executablePath = executablePath;
        this._mainModulePath = mainModulePath;
    }
    
    
    public toCommand(): string {
        let segments: string[] = [];

        if (this._executablePath) {
            segments.push(`${this.escapeSegment(this._executablePath)}`);
        }

        if (this._mainModulePath) {
            segments.push(`${this.escapeSegment(this._mainModulePath)}`);
        }

        for (let command of this._commands) {
            segments.push(`${command}`);
        }
        
        for (let option of this._options) {
            segments.push(`${option.toString()}`);
        }
        
        return segments.join(' ');
    }


    private escapeSegment(segment: string): string {
        segment = this.wrapSegmented(segment);

        return segment;
    }


    private isSegmented(segment: string): boolean {
        return segment.indexOf(' ') >= 0;
    }


    private wrapSegmented(segment: string): string {
        if (this.isSegmented(segment)) {
            return `"${segment}"`;
        }

        return segment;
    }
}
