import {Path} from '../path/Path';
import {FileInputStream} from './stream/FileInputStream';
import {FileOutputStream} from './stream/FileOutputStream';
import {AccessPermissions} from './AccessPermissions';
import {AccessMode} from './AccessMode';
import {DirectoryContent} from './DirectoryContent';
import {Directory} from './Directory';
import {File} from './File';


export interface FileStorage {
    createDirectory(path: Path, accessPermissions?: AccessPermissions): Promise<void>;
    getDirectory(path: Path): Promise<Directory>;
    readDirectory(path: Path): Promise<DirectoryContent>;
    removeDirectory(path: Path): Promise<void>;
    directoryExists(path: Path): Promise<boolean>;

    readFile(path: Path): FileInputStream;
    writeFile(path: Path): FileOutputStream;
    getFile(path: Path): Promise<File>;
    removeFile(path: Path): Promise<void>;
    fileExists(path: Path): Promise<boolean>;

    createPath(path: Path, accessPermissions?: AccessPermissions): Promise<void>;
    getAbsolutePath(path: Path): Promise<Path>;
    
    checkAccess(path: Path, accessMode?: AccessMode): Promise<void>;
    
    setPermissions(path: Path, accessPermissions: AccessPermissions): Promise<void>;
    
    setOwner(path: Path, userId: number, groupId: number): Promise<void>;
    
    createSymbolicLink(path: Path, linkName: Path): Promise<void>;
    createLink(path: Path, linkName: Path): Promise<void>;
    readLink(path: Path): Promise<Path>;
    
    move(source: Path, destination: Path): Promise<void>;
}
