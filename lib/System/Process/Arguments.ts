import Process = NodeJS.Process;
import {IFormattable, Pool} from '../../Core/types';
import {toCamelCase} from '../Text/Helpers';


export type CLIFlag = string|string[]|boolean;
export type CLIFlags = Pool<CLIFlag>;

export const FLAG_PATTERN: RegExp = /^-/;


// Recommended formats:
//
// <action> [<...commands> <...flags>]
//
// npm install -g grunt-cli
// npm install gulp jest --save-dev
// npm install -S lodash async
// gulp watch
// typings install lodash

export default class Arguments implements IFormattable {
    public static fromProcess(process: Process): Arguments {
        let action: string = undefined;
        let commands: string[] = [];
        let flags: CLIFlags = Object.create(null);

        process.argv.slice(2).forEach((arg: string, index: number) => {
            let [key, value] = arg.split('=', 2);
            let isFlag: boolean = FLAG_PATTERN.test(key);
            let isAction: boolean = !isFlag && index === 0;
            let flag: CLIFlag = value || true;

            if (isAction) {
                action = key;
            } else if (isFlag) {
                key = toCamelCase(key);
                flags[key] = flag;
            } else {
                commands.push(key);
            }
        });

        return new Arguments(action, commands, flags);
    }


    private _action: string;
    private _commands: string[];
    private _flags: CLIFlags;


    get action(): string {
        return this._action;
    }


    get commands(): string[] {
        return this._commands;
    }


    get flags(): CLIFlags {
        return this._flags;
    }


    constructor(
        action: string = null,
        commands: string[] = [],
        flags: CLIFlags = Object.create(null)
    ) {
        this._action = action;
        this._commands = commands;
        this._flags = flags;
    }


    public toString(): string {
        let parts: string[] = [];

        if (this._action) {
            parts.push(this._action);
        }

        if (this._commands) {
            parts.push(...this._commands);
        }

        Object.keys(this._flags).forEach((name: string) => {
            let value: CLIFlag = this._flags[name];

            parts.push(name);

            if (typeof value === 'string') {
                parts.push((value as string));
            } else if (Array.isArray(value)) {
                parts.push(...value);
            }
        });

        return parts.join(' ');
    }
}
