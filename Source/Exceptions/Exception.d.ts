import { IJSONSerializable } from '../types';
export declare class Exception extends Error implements IJSONSerializable<string> {
    static fromError(error: Error): Exception;
    readonly timestamp: number;
    readonly helpInfo: string;
    readonly helpLink: string;
    constructor(message: string);
    toString(): string;
    toJSON(): string;
}
