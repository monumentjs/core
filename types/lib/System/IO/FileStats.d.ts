import { DataSizeUnits } from './types';
export default class FileStats {
    name: string;
    path: string;
    extension: string;
    lastModificationDate: Date;
    lastAccessDate: Date;
    creationDate: Date;
    sizeInBytes: number;
    getSizeInUnits(units: DataSizeUnits): number;
}
