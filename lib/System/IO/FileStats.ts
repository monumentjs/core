import {DataSizeUnits} from './types';


export default class FileStats {
    public name: string;
    public path: string;
    public extension: string;
    public lastModificationDate: Date;
    public lastAccessDate: Date;
    public creationDate: Date;
    public sizeInBytes: number;


    public getSizeInUnits(units: DataSizeUnits): number {
        return this.sizeInBytes / units;
    }
}

