import {Path} from '../path/Path';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemEntry} from './FileSystemEntry';
import {MemorySize} from '@monument/core/main/MemorySize';
import {DateTime} from '@monument/core/main/time/DateTime';


export abstract class File extends FileSystemEntry {
    public readonly size: MemorySize;


    protected constructor(
        path: Path,
        lastAccessTime: DateTime,
        lastChangeTime: DateTime,
        lastWriteTime: DateTime,
        creationTime: DateTime,
        accessPermissions: AccessPermissions,
        deviceId: number | undefined,
        specialDeviceId: number | undefined,
        ownerUserId: number | undefined,
        ownerGroupId: number | undefined,
        size: MemorySize
    ) {
        super(path, lastAccessTime, lastChangeTime, lastWriteTime, creationTime, accessPermissions, deviceId, specialDeviceId, ownerUserId, ownerGroupId);
        this.size = size;
    }
}
