import {HttpEventArgs} from './HttpEventArgs';


export class HttpProgressEventArgs extends HttpEventArgs {
    private _lengthComputable: boolean;
    private _loaded: number;
    private _total: number;


    public get total(): number {
        return this._total;
    }


    public get loaded(): number {
        return this._loaded;
    }


    public get lengthComputable(): boolean {
        return this._lengthComputable;
    }


    public constructor(lengthComputable: boolean, loaded: number, total: number) {
        super();

        this._lengthComputable = lengthComputable;
        this._loaded = loaded;
        this._total = total;
    }
}
