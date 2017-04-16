import * as fs from 'fs';
import {AsyncResult} from '../../../src/Core/types';
import {callAsyncMethod} from '../../../src/Core/Async/Utils';
import {Fixture} from '../../../src/Testing/Fixture';
import {AccessPermissions} from '../../../src/System/IO/AccessPermissions';


export default class DirectoryFixture extends Fixture {
    private _path: string;
    private _accessPermissions: AccessPermissions;


    public get path(): string {
        return this._path;
    }


    public constructor(
        fullPath: string,
        accessPermissions: AccessPermissions = AccessPermissions.All
    ) {
        super();

        this._path = fullPath;
        this._accessPermissions = accessPermissions;
    }


    protected doCreate(): AsyncResult<void> {
        return callAsyncMethod<void>(fs, 'mkdir', this._path, this._accessPermissions);
    }


    protected doDestroy(): AsyncResult<void> {
        return callAsyncMethod<void>(fs, 'rmdir', this._path);
    }
}
