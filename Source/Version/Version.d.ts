import { ComparisonResult, ICloneable, IComparable, IEquatable, IJSONSerializable } from '../types';
import { ReleaseStatus } from './types';
export declare class Version implements IEquatable<Version>, IComparable<Version>, ICloneable<Version>, IJSONSerializable<string> {
    static validate(version: string): boolean;
    private _major;
    private _minor;
    private _patch;
    private _status;
    private _revision;
    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly status: ReleaseStatus;
    readonly revision: number;
    constructor(major?: number, minor?: number, patch?: number, status?: ReleaseStatus, revision?: number);
    compareTo(other: Version): ComparisonResult;
    equals(other: Version): boolean;
    clone(): Version;
    toJSON(): string;
    toString(): string;
}
