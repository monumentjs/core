import * as fs from 'fs';


export enum DataSizeUnits {
    Bytes       = 1024 ** 0,
    Kilobytes   = 1024 ** 1,
    Megabytes   = 1024 ** 2,
    Gigabytes   = 1024 ** 3,
    Terabytes   = 1024 ** 4,
    Petabytes   = 1024 ** 5,
    Exabytes    = 1024 ** 6,
    Zettabytes  = 1024 ** 7,
    Yottabytes  = 1024 ** 8
}


export enum ByteOrder {
    BigEndian,
    LittleEndian
}


export enum AccessPermissions {
    ExecuteByOthers = 1 << 0,
    WriteByOthers   = 1 << 1,
    ReadByOthers    = 1 << 2,
    AllByOthers     = ExecuteByOthers | WriteByOthers | ReadByOthers,

    ExecuteByGroup  = 1 << 3,
    WriteByGroup    = 1 << 4,
    ReadByGroup     = 1 << 5,
    AllByGroup      = ExecuteByGroup | WriteByGroup | ReadByGroup,

    ExecuteByOwner  = 1 << 6,
    WriteByOwner    = 1 << 7,
    ReadByOwner     = 1 << 8,
    AllByOwner      = ExecuteByOwner | WriteByOwner | ReadByOwner,

    Default = WriteByOthers | ReadByOthers | WriteByGroup | ReadByGroup | WriteByOwner | ReadByOwner,

    StickyBit       = 1 << 9
}


export enum AccessMode {
    Availability    = 0,
    Read            = 1 << 0,
    Write           = 1 << 1,
    Execute         = 1 << 2
}


export enum FileMode {
    /**
     * Flag indicating that data will be appended to the end of the file.
     */
    Append = fs.constants.O_APPEND,

        /**
         * Flag indicating to create the file if it does not already exist.
         */
    Create = fs.constants.O_CREAT,

        /**
         * Flag indicating that if the file exists and is a regular file, and the file is opened successfully
         * for write access, its length shall be truncated to zero.
         */
    Truncate = fs.constants.O_TRUNC,

        /**
         * Flag indicating to open a file for read-only access.
         */
    Read = fs.constants.O_RDONLY,

        /**
         * Flag indicating to open a file for write-only access.
         */
    Write = fs.constants.O_WRONLY,

        /**
         * Flag indicating to open a file for read-write access.
         */
    ReadWrite = fs.constants.O_RDWR,

        /**
         * Flag indicating that opening a file should fail if the `Create` flag is set and the file already exists.
         */
    Exclusive = fs.constants.O_EXCL,

        /**
         * Flag indicating to open the symbolic link itself rather than the resource it is pointing to.
         */
    Symlink = fs.constants.O_SYMLINK,

        /**
         * Flag indicating to open the file in nonblocking mode when possible.
         */
    NonBlock = fs.constants.O_NONBLOCK,

        /**
         * Flag indicating that the file is opened for synchronous I/O.
         */
    Synchronous = fs.constants.O_SYNC,

        /**
         * Flag indicating that the open should fail if the path is a symbolic link.
         */
    NoFollow = fs.constants.O_NOFOLLOW,
        /**
         * When set, an attempt will be made to minimize caching effects of file I/O.
         */
    Direct = fs.constants.O_DIRECT
}


export interface IFileSystemStats {
    isFile: boolean;
    isFIFO: boolean;
    isDirectory: boolean;
    isBlockDevice: boolean;
    isCharacterDevice: boolean;
    isSocket: boolean;
    isSymbolicLink: boolean;

    length: number;

    creationTime: Date;
    lastWriteTime: Date;
    lastChangeTime: Date;
    lastAccessTime: Date;

    deviceId: number;
    specialDeviceId: number;
    inode: number;

    accessPermissions: AccessPermissions;
    ownerUserId: number;
    ownerGroupId: number;

    hardLinksCount: number;
    sizeOfAllocatedBlock: number;
    countOfAllocatedBlocks: number;
}
