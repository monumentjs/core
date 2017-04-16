import {AsyncResult} from '../Core/types';


export abstract class Fixture {
    private _isCreated: boolean = false;


    public get isCreated(): boolean {
        return this._isCreated;
    }


    public async create(): AsyncResult<void> {
        await this.doCreate();

        this._isCreated = true;
    }


    public async destroy(): AsyncResult<void> {
        await this.doDestroy();

        this._isCreated = false;
    }


    protected abstract doCreate(): AsyncResult<void>;
    protected abstract doDestroy(): AsyncResult<void>;
}
