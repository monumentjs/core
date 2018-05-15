import {DateTime} from '@monument/time/main/DateTime';
import {Path} from '../path/Path';
import {AccessPermissions} from './AccessPermissions';


export abstract class Directory {
    protected constructor(
        public readonly path: Path,
        public readonly lastAccessTime: DateTime,
        public readonly lastChangeTime: DateTime,
        public readonly lastWriteTime: DateTime,
        public readonly creationTime: DateTime,
        public readonly accessPermissions: AccessPermissions,
        public readonly deviceId: number,
        public readonly specialDeviceId: number,
        public readonly ownerUserId: number,
        public readonly ownerGroupId: number
    ) {}
}
