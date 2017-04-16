import DateTime from '../../Core/Time/DateTime';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemUser} from './FileSystemUser';
import {FileSystemEntryType} from './FileSystemEntryType';


export type FileSystemEntry = {
    type: FileSystemEntryType;

    length: number;

    creationTime: DateTime;
    lastWriteTime: DateTime;
    lastChangeTime: DateTime;
    lastAccessTime: DateTime;

    deviceId: number;
    specialDeviceId: number;
    inode: number;

    accessPermissions: AccessPermissions;
    owner: FileSystemUser;

    hardLinksCount: number;
    sizeOfAllocatedBlock: number;
    countOfAllocatedBlocks: number;
};
