import {Equatable} from '@monument/core/main/utils/comparison/Equatable';
import {MultiValueMap} from '@monument/core/main/collection/specialized/MultiValueMap';
import {LinkedMultiValueMap} from '@monument/core/main/collection/specialized/LinkedMultiValueMap';
import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {UriParser} from './UriParser';
import {UriComponents} from './UriComponents';
import {UriSerializer} from './UriSerializer';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {PreserveCaseComparator} from '@monument/core/main/text/PreserveCaseComparator';
import {EqualityComparator} from '@monument/core/main/utils/comparison/EqualityComparator';
import {UriUtils} from './UriUtils';


export class Uri implements UriComponents, JSONSerializable<string>, Equatable<Uri> {
    private readonly _schema?: string;
    private readonly _userName?: string;
    private readonly _password?: string;
    private readonly _host?: string;
    private readonly _port?: number;
    private readonly _path?: string;
    private readonly _fragment?: string;
    private readonly _queryParameters: MultiValueMap<string, string> = new LinkedMultiValueMap();
    private _serialized?: string;

    public get fragment(): string | undefined {
        return this._fragment;
    }

    public get host(): string | undefined {
        return this._host;
    }

    public get password(): string | undefined {
        return this._password;
    }

    public get path(): string | undefined {
        return this._path;
    }

    public get port(): number | undefined {
        return this._port;
    }

    public get queryParameters(): ReadOnlyMultiValueMap<string, string> {
        return this._queryParameters;
    }

    public get schema(): string | undefined {
        return this._schema;
    }

    public get userName(): string | undefined {
        return this._userName;
    }

    public constructor(source: UriComponents);

    public constructor(source: string);

    public constructor(source: string | UriComponents) {
        if (typeof source === 'string') {
            source = UriParser.parse(source);
        }

        UriUtils.validateIntegrity(source);

        this._schema = source.schema;
        this._userName = source.userName;
        this._password = source.password;
        this._host = source.host;
        this._port = source.port;
        this._path = source.path;
        this._queryParameters.putAll(source.queryParameters);
        this._fragment = source.fragment;
    }

    public equals(other: Uri): boolean;
    public equals(other: Uri, ignoreCase: boolean): boolean;
    public equals(other: Uri, ignoreCase: boolean = false): boolean {
        const textComparator: EqualityComparator<string> = ignoreCase ? IgnoreCaseComparator.get() : PreserveCaseComparator.get();

        if (this.schema !== other.schema && this.schema != null && other.schema != null) {
            if (!textComparator.equals(this.schema, other.schema)) {
                return false;
            }
        }

        // TODO: compare all fields

        return true;
    }

    public toString(): string {
        if (this._serialized == null) {
            this._serialized = UriSerializer.serialize(this);
        }

        return this._serialized;
    }

    public toJSON(): string {
        return this.toString();
    }
}
