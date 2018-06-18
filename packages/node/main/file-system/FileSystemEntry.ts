import {Path} from '../path/Path';
import {AccessPermissions} from './AccessPermissions';
import {DateTime} from '@monument/core/main/time/DateTime';


export abstract class FileSystemEntry {
    public readonly path: Path;
    public readonly lastAccessTime: DateTime;
    public readonly lastChangeTime: DateTime;
    public readonly lastWriteTime: DateTime;
    public readonly creationTime: DateTime;
    public readonly accessPermissions: AccessPermissions;
    public readonly deviceId: number | undefined;
    public readonly specialDeviceId: number | undefined;
    public readonly ownerUserId: number | undefined;
    public readonly ownerGroupId: number | undefined;


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
        ownerGroupId: number | undefined
    ) {
        this.path = path;
        this.lastAccessTime = lastAccessTime;
        this.lastChangeTime = lastChangeTime;
        this.lastWriteTime = lastWriteTime;
        this.creationTime = creationTime;
        this.accessPermissions = accessPermissions;
        this.deviceId = deviceId;
        this.specialDeviceId = specialDeviceId;
        this.ownerUserId = ownerUserId;
        this.ownerGroupId = ownerGroupId;
    }
}
