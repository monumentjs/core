import {MultiValueMap} from '@monument/core/main/collection/specialized/MultiValueMap';
import {LinkedMultiValueMap} from '@monument/core/main/collection/specialized/LinkedMultiValueMap';
import {Uri} from './Uri';
import {UriComponents} from './UriComponents';
import {UriParser} from './UriParser';
import {UriSerializer} from './UriSerializer';


export class UriBuilder implements UriComponents {
    private _schema?: string;
    private _userName?: string;
    private _password?: string;
    private _host?: string;
    private _port?: number;
    private _path?: string;
    private _fragment?: string;
    private readonly _queryParams: MultiValueMap<string, string> = new LinkedMultiValueMap();

    public get fragment(): string | undefined {
        return this._fragment;
    }

    public set fragment(fragment: string | undefined) {
        this._fragment = fragment;
    }

    public get host(): string | undefined {
        return this._host;
    }

    public set host(host: string | undefined) {
        this._host = host;
    }

    public get password(): string | undefined {
        return this._password;
    }

    public set password(password: string | undefined) {
        this._password = password;
    }

    public get path(): string | undefined {
        return this._path;
    }

    public set path(path: string | undefined) {
        this._path = path;
    }

    public get port(): number | undefined {
        return this._port;
    }

    public set port(port: number | undefined) {
        this._port = port;
    }

    public get queryParameters(): ReadOnlyMultiValueMap<string, string> {
        return this._queryParams;
    }

    public get schema(): string | undefined {
        return this._schema;
    }

    public set schema(schema: string | undefined) {
        this._schema = schema;
    }

    public get userName(): string | undefined {
        return this._userName;
    }

    public set userName(userName: string | undefined) {
        this._userName = userName;
    }

    public constructor();

    public constructor(original: string);

    public constructor(original: string, parser: UriParser);

    public constructor(original: UriComponents);

    public constructor(original?: string | UriComponents) {
        if (original != null) {
            if (typeof original === 'string') {
                original = UriParser.parse(original);
            }

            this._schema = original.schema;
            this._userName = original.userName;
            this._password = original.password;
            this._host = original.host;
            this._port = original.port;
            this._path = original.path;
            this._queryParams.putAll(original.queryParameters);
            this._fragment = original.fragment;
        }
    }

    public build(): Uri {
        return new Uri(this);
    }

    public setParameter(name: string, value: { toString(): string }) {
        this._queryParams.put(name, value.toString());
    }

    public setParameters(values: { [name: string]: { toString(): string } | undefined | null }) {
        Object.entries(values).forEach(([key, value]) => {
            if (value != null) {
                this._queryParams.put(key, value.toString());
            }
        });
    }

    public removeParameter(name: string, value: { toString(): string }) {
        this._queryParams.remove(name, value.toString());
    }

    public removeParameters(values: { [name: string]: { toString(): string } | undefined | null }) {
        Object.entries(values).forEach(([key, value]) => {
            if (value != null) {
                this._queryParams.remove(key, value.toString());
            }
        });
    }

    public toString(): string {
        return UriSerializer.serialize(this);
    }
}
