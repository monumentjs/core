import DateTime from '../../Core/Time/DateTime';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemUser} from './FileSystemUser';


export type FileSystemEntryStats = {
    isFile: boolean;
    isFIFO: boolean;
    isDirectory: boolean;
    isBlockDevice: boolean;
    isCharacterDevice: boolean;
    isSocket: boolean;
    isSymbolicLink: boolean;

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
