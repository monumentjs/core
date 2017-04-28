import {AsyncResult} from '../Core/types';


export abstract class Fixture {
    private _isCreated: boolean = false;


    public get isCreated(): boolean {
        return this._isCreated;
    }


    public async create(): AsyncResult {
        await this.doCreate();

        this._isCreated = true;
    }


    public async destroy(): AsyncResult {
        await this.doDestroy();

        this._isCreated = false;
    }


    protected abstract doCreate(): AsyncResult;
    protected abstract doDestroy(): AsyncResult;
}
