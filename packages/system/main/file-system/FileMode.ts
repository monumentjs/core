import * as fs from 'fs';


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
