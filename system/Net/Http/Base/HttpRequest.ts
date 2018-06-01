import {Uri} from '../../Uri/Uri';
import {HttpHeaders} from '../Headers/HttpHeaders';
import {HttpMethod} from './HttpMethod';
import {HttpForm} from './HttpForm';
import {HttpFiles} from './HttpFiles';
import {HttpCookies} from './HttpCookies';


export class HttpRequest {
    private _method: HttpMethod;
    private _url: Uri;
    private _headers: HttpHeaders = new HttpHeaders();
    private _cookies: HttpCookies = new HttpCookies();
    private _form: HttpForm = new HttpForm();
    private _files: HttpFiles = new HttpFiles();
    private _timeout: number = 0;
    private _crossDomain: boolean = false;


    public get method(): HttpMethod {
        return this._method;
    }


    public set method(value: HttpMethod) {
        this._method = value;
    }


    public get url(): Uri {
        return this._url;
    }


    public set url(value: Uri) {
        this._url = value;
    }


    public get headers(): HttpHeaders {
        return this._headers;
    }


    public get cookies(): HttpCookies {
        return this._cookies;
    }


    public get timeout(): number {
        return this._timeout;
    }


    public set timeout(value: number) {
        this._timeout = value;
    }


    public get crossDomain(): boolean {
        return this._crossDomain;
    }


    public set crossDomain(value: boolean) {
        this._crossDomain = value;
    }


    public get form(): HttpForm {
        return this._form;
    }


    public set form(value: HttpForm) {
        this._form = value;
    }


    public get files(): HttpFiles {
        return this._files;
    }


    public constructor(method: HttpMethod, url: Uri | string) {
        this._method = method;
        this._url = Uri.cast(url);
    }
}
