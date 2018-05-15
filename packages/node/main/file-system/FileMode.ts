import * as fs from 'fs';


export enum FileMode {
    /**
     * Flag indicating that data will be appended to the end of the file.
     */
    APPEND = fs.constants.O_APPEND,

    /**
     * Flag indicating to create the file if it does not already exist.
     */
    CREATE = fs.constants.O_CREAT,

    /**
     * Flag indicating that if the file exists and is a regular file, and the file is opened successfully
     * for write access, its length shall be truncated to zero.
     */
    TRUNCATE = fs.constants.O_TRUNC,

    /**
     * Flag indicating to open a file for read-only access.
     */
    READ = fs.constants.O_RDONLY,

    /**
     * Flag indicating to open a file for write-only access.
     */
    WRITE = fs.constants.O_WRONLY,

    /**
     * Flag indicating to open a file for read-write access.
     */
    READ_WRITE = fs.constants.O_RDWR,

    /**
     * Flag indicating that opening a file should fail if the `Create` flag is set and the file already exists.
     */
    EXCLUSIVE = fs.constants.O_EXCL,

    /**
     * Flag indicating to open the symbolic link itself rather than the resource it is pointing to.
     */
    SYMLINK = fs.constants.O_SYMLINK,

    /**
     * Flag indicating to open the file in nonblocking mode when possible.
     */
    NON_BLOCK = fs.constants.O_NONBLOCK,

    /**
     * Flag indicating that the file is opened for synchronous I/O.
     */
    SYNCHRONOUS = fs.constants.O_SYNC,

    /**
     * Flag indicating that the open should fail if the path is a symbolic link.
     */
    NO_FOLLOW = fs.constants.O_NOFOLLOW,

    /**
     * When set, an attempt will be made to minimize caching effects of file I/O.
     */
    DIRECT = fs.constants.O_DIRECT
}
