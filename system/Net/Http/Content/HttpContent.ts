import {OutputStream} from '../../../../stream/main/OutputStream';
import {HttpHeaders} from '../Headers/HttpHeaders';


export abstract class HttpContent {
    private _headers: HttpHeaders = new HttpHeaders();


    public get headers(): HttpHeaders {
        return this._headers;
    }


    public abstract copyTo(writer: OutputStream<Buffer>): Promise<void>;

    public abstract refresh(): Promise<void>;
}
