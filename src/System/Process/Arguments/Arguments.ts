import {ArgumentsParser} from './ArgumentsParser';
import {Assert} from '../../../Core/Assertion/Assert';
import {OptionsCollection} from './OptionsCollection';
import {ReadOnlyCollection} from '../../../Core/Collections/ReadOnlyCollection';


export class Arguments {
    public static parse(args: string): Arguments {
        let parser: ArgumentsParser = new ArgumentsParser();

        parser.parse(args);

        return parser.value;
    }


    private _executablePath: string;
    private _mainModulePath: string;
    private _commands: ReadOnlyCollection<string>;
    private _options: OptionsCollection;
    
    
    public get executablePath(): string {
        return this._executablePath;
    }
    

    public get mainModulePath(): string {
        return this._mainModulePath;
    }

    
    public get commands(): ReadOnlyCollection<string> {
        return this._commands;
    }
    
    
    public get options(): OptionsCollection {
        return this._options;
    }


    public constructor(
        executablePath: string,
        mainModulePath: string,
        commands: ReadOnlyCollection<string> = new ReadOnlyCollection<string>(),
        options: OptionsCollection = new OptionsCollection()
    ) {
        Assert.argument('executablePath', executablePath).notNull();
        Assert.argument('mainModulePath', mainModulePath).notNull();
        Assert.argument('commands', commands).notNull();
        Assert.argument('options', options).notNull();

        this._commands = commands;
        this._options = options;
        this._executablePath = executablePath;
        this._mainModulePath = mainModulePath;
    }
    
    
    public toString(): string {
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
        if (this.isUnsafeSegment(segment)) {
            return `"${segment}"`;
        }

        return segment;
    }


    private isUnsafeSegment(segment: string): boolean {
        return /\s/.test(segment);
    }
}
