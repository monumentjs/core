import {FileSystemEntryType} from './FileSystemEntryType';
import DateTime from '../../Core/Time/DateTime';
import {AccessPermissions} from './AccessPermissions';


export interface IFileSystemEntry {
    readonly entryType: FileSystemEntryType;
    readonly path: string;
    readonly directoryName: string;
    readonly baseName: string;
    readonly baseNameWithoutExtension: string;
    readonly extension: string;
    readonly root: string;
    readonly creationTime: DateTime;
    readonly lastWriteTime: DateTime;
    readonly lastChangeTime: DateTime;
    readonly lastAccessTime: DateTime;
    readonly deviceId: number;
    readonly specialDeviceId: number;
    readonly inode: number;
    readonly accessPermissions: AccessPermissions;
    readonly ownerUserId: number;
    readonly ownerGroupId: number;
    readonly length: number;
    readonly hardLinksCount: number;
    readonly sizeOfAllocatedBlock: number;
    readonly countOfAllocatedBlocks: number;
}
