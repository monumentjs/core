import {ArgumentsParser} from './ArgumentsParser';
import {ReadOnlyCollection} from '../../../collections-core/main/ReadOnlyCollection';
import {Enumerable} from '../../../collections-core/main/Enumerable';
import {Map} from '../../../collections-core/main/Map';
import {Option} from './Option';


export class Arguments {
    public static fromSegments(segments: Enumerable<string>): Arguments {
        let args: string = this.joinSegments(segments);

        return ArgumentsParser.parse(args);
    }


    private static joinSegments(segments: Enumerable<string>): string {
        let safeSegments: string[] = [];

        for (let segment of segments) {
            safeSegments.push(Arguments.escapeSegment(segment));
        }

        return safeSegments.join(' ');
    }


    private static escapeSegment(segment: string): string {
        if (Arguments.isUnsafeSegment(segment)) {
            return `"${segment}"`;
        }

        return segment;
    }


    private static isUnsafeSegment(segment: string): boolean {
        return /\s/.test(segment);
    }


    private _executablePath: string;
    private _mainModulePath: string;
    private _commands: ReadOnlyCollection<string>;
    private _options: Map<string, Option>;


    public get executablePath(): string {
        return this._executablePath;
    }


    public get mainModulePath(): string {
        return this._mainModulePath;
    }


    public get commands(): ReadOnlyCollection<string> {
        return this._commands;
    }


    public get options(): Map<string, Option> {
        return this._options;
    }


    public constructor(
        executablePath: string,
        mainModulePath: string,
        commands: ReadOnlyCollection<string> = new ReadOnlyCollection<string>(),
        options: Map<string, Option> = new Map()
    ) {
        this._commands = commands;
        this._options = options;
        this._executablePath = executablePath;
        this._mainModulePath = mainModulePath;
    }


    public toString(): string {
        let segments: string[] = [];

        if (this._executablePath) {
            segments.push(`${Arguments.escapeSegment(this._executablePath)}`);
        }

        if (this._mainModulePath) {
            segments.push(`${Arguments.escapeSegment(this._mainModulePath)}`);
        }

        for (let command of this._commands) {
            segments.push(`${command}`);
        }

        for (let option of this._options) {
            segments.push(`${option.toString()}`);
        }

        return segments.join(' ');
    }
}
