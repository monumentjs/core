import { IFormattable, ICloneable, IComparable, IJSONSerializable } from '../Core/types';
import { ReleaseStatus, VersionComponents } from './types';
export default class Version implements IFormattable, ICloneable<Version>, IComparable<Version>, IJSONSerializable<VersionComponents> {
    static parse(version: string): Version;
    static validate(version: string): boolean;
    private static components;
    private static preReleaseStageAliases;
    private _major;
    private _minor;
    private _patch;
    private _status;
    private _revision;
    major: number;
    minor: number;
    patch: number;
    status: ReleaseStatus;
    revision: number;
    constructor(major?: number, minor?: number, patch?: number, status?: ReleaseStatus, preReleaseVersion?: number);
    compare(version: Version): number;
    clone(): Version;
    toJSON(): VersionComponents;
    toString(): string;
    private compareComponents(current, other);
}
