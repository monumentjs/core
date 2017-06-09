import * as fs from 'fs';
import {callAsyncMethod} from '../../../src/Core/Async/Utils';
import {Fixture} from '../../../src/Testing/Fixture';
import {AccessPermissions} from '../../../src/System/IO/AccessPermissions';


export class FileFixture extends Fixture {
    private _fileName: string;
    private _content: string | Buffer;
    private _accessPermissions: AccessPermissions;


    public get fileName(): string {
        return this._fileName;
    }


    public constructor(
        fileName: string,
        content: string | Buffer,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ) {
        super();

        this._fileName = fileName;
        this._content = content;
        this._accessPermissions = accessPermissions;
    }


    protected async doCreate(): Promise<void> {
        await callAsyncMethod(fs, 'writeFile', this._fileName, this._content/*, {
            mode: this._accessPermissions
        }*/);
    }


    protected async doDestroy(): Promise<void> {
        try {
            await callAsyncMethod(fs, 'unlink', this._fileName);
        } catch (ex) {/* */}
    }
}
