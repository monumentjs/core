import Process = NodeJS.Process;
import { IFormattable, Pool } from '../../Core/types';
export declare type CLIFlag = string | string[] | boolean;
export declare type CLIFlags = Pool<CLIFlag>;
export declare const FLAG_PATTERN: RegExp;
export default class Arguments implements IFormattable {
    static fromProcess(process: Process): Arguments;
    private _action;
    private _commands;
    private _flags;
    readonly action: string;
    readonly commands: string[];
    readonly flags: CLIFlags;
    constructor(action?: string, commands?: string[], flags?: CLIFlags);
    toString(): string;
}
