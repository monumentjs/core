import {Stats} from 'fs';
import {DateTime} from '@monument/time/main/DateTime';
import {Path} from './Path';
import {AccessPermissions} from './AccessPermissions';


export class DirectoryInfo {
    public readonly path: Path;
    public readonly lastAccessTime: DateTime;
    public readonly lastChangeTime: DateTime;
    public readonly lastWriteTime: DateTime;
    public readonly creationTime: DateTime;
    public readonly accessPermissions: AccessPermissions;
    public readonly deviceId: number;
    public readonly specialDeviceId: number;
    public readonly ownerUserId: number;
    public readonly ownerGroupId: number;


    public constructor(path: Path | string, stats: Stats) {
        this.path = Path.cast(path);
        this.lastAccessTime = DateTime.fromDate(stats.atime);
        this.lastWriteTime = DateTime.fromDate(stats.mtime);
        this.lastChangeTime = DateTime.fromDate(stats.ctime);
        this.creationTime = DateTime.fromDate(stats.birthtime);
        this.accessPermissions = stats.mode & 0o777;
        this.deviceId = stats.dev;
        this.specialDeviceId = stats.rdev;
        this.ownerUserId = stats.uid;
        this.ownerGroupId = stats.gid;
    }
}
