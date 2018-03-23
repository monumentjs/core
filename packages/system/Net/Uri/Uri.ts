import {InvalidOperationException} from '../../../core/main/exceptions/InvalidOperationException';
import {StringBuilder} from '../../../text/main/StringBuilder';
import {Cloneable} from '../../../core/main/Cloneable';
import {JSONSerializable} from '../../../core/main/JSONSerializable';
import {Equatable} from '../../../core/main/Equatable';
import {List} from '../../../collections-core/main/List';
import {ArrayList} from '../../../collections/main/ArrayList';
import {EMPTY_STRING} from '../../../text/main/constants';
import {QueryParameters} from './QueryParameters';
import {UriFormatException} from './UriFormatException';
import {QueryStringParser} from './QueryStringParser';
import {Scheme} from './Scheme';


export class Uri implements Cloneable<Uri>, JSONSerializable<string>, Equatable<Uri> {
    private static readonly KNOWN_SCHEMES_NAMES: List<string> = new ArrayList(Object.values(Scheme).map((schemeName: string): string => {
        return schemeName.toLowerCase();
    }));

    public static readonly ROOT_PATH: string = '/';
    public static readonly PATH_SEGMENTS_DELIMITER: string = '/';
    public static readonly PORT_PREFIX: string = ':';
    public static readonly QUERY_PARAMS_PREFIX: string = '?';
    public static readonly FRAGMENT_PREFIX: string = '#';
    public static readonly AUTH_SEGMENTS_DELIMITER: string = ':';
    public static readonly AUTH_SEGMENTS_SUFFIX: string = '@';
    public static readonly URI_PATTERN: RegExp = /^(([^:/?#]+):\/\/)?([^/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?$/;
    public static readonly URI_AUTHORITY_PATTERN: RegExp = /^(([^:@]+)(:([^@]+))?@)?([^:]+)(:([\d]+))?$/;


    public static encode(uri: string): string {
        return encodeURI(uri);
    }


    public static decode(uri: string): string {
        return decodeURI(uri);
    }


    public static encodeComponent(uriComponent: string): string {
        return encodeURIComponent(uriComponent);
    }


    public static decodeComponent(uriComponent: string): string {
        return decodeURIComponent(uriComponent);
    }


    public static isKnownScheme(scheme: string): boolean {
        return this.KNOWN_SCHEMES_NAMES.contains(scheme.toLowerCase());
    }


    public static normalizeScheme(scheme: string): Scheme {
        scheme = this.decodeComponent(scheme).toLowerCase();

        if (this.isKnownScheme(scheme)) {
            return scheme as Scheme;
        } else {
            return Scheme.Unknown;
        }
    }


    public static parse(uri: string): Uri {
        return new Uri(uri);
    }


    public static validate(uri: string): boolean {
        return Uri.URI_PATTERN.test(uri);
    }


    public static cast(url: Uri | string): Uri {
        return typeof url === 'string' ? new Uri(url) : url;
    }

    private _originalUri: string = EMPTY_STRING;
    private _scheme: Scheme = Scheme.Unknown;
    private _authority: string = EMPTY_STRING;
    private _userName: string = EMPTY_STRING;
    private _password: string = EMPTY_STRING;
    private _host: string = EMPTY_STRING;
    private _port: number | undefined;
    private _path: string = Uri.ROOT_PATH;
    private _query: QueryParameters;
    private _fragment: string = EMPTY_STRING;


    public get originalUri(): string {
        return this._originalUri;
    }


    public get scheme(): Scheme {
        return this._scheme;
    }


    public get authority(): string {
        return this._authority;
    }


    public get userName(): string {
        return this._userName;
    }


    public get password(): string {
        return this._password;
    }


    public get auth(): string {
        if (this.userName && this.password) {
            return `${this.userName}:${this.password}`;
        }

        return EMPTY_STRING;
    }


    public get host(): string {
        return this._host;
    }


    public get port(): number | undefined {
        return this._port;
    }


    public get path(): string {
        return this._path;
    }


    public get query(): QueryParameters {
        return this._query;
    }


    public get fragment(): string {
        return this._fragment;
    }


    public get isAbsolute(): boolean {
        return this._scheme !== Scheme.Unknown
            && this._authority.length > 0
            && this._path.length > 0;
    }


    public get isDefaultPort(): boolean {
        if (!this.isAbsolute) {
            throw new InvalidOperationException(
                `This instance represents a relative URI, and this property is valid only for absolute URIs.`
            );
        }

        if (this.scheme === Scheme.FILE) {
            throw new InvalidOperationException(
                `Operation is not allowed for file URIs.`
            );
        }

        if (this.port != null) {
            return Scheme.isDefaultPort(this.scheme, this.port);
        }

        return false;
    }


    public constructor(uri: string = Uri.ROOT_PATH) {
        if (uri === EMPTY_STRING) {
            throw new UriFormatException('URI cannot be empty string.');
        }

        let [scheme, authority, path, query, fragment] = this.getBaseComponents(uri);

        this._originalUri = uri;
        this._scheme = Uri.normalizeScheme(scheme);
        this._authority = Uri.decodeComponent(authority);
        this._path = Uri.decodeComponent(this.normalizePath(path));
        this._query = QueryStringParser.parse(query);
        this._fragment = Uri.decodeComponent(fragment);

        if (authority) {
            let [userName, password, host, port] = this.getAuthorityComponents(authority);

            this._userName = Uri.decodeComponent(userName);
            this._password = Uri.decodeComponent(password);
            this._host = Uri.decodeComponent(host);
            this._port = this.normalizePortNumber(port);
        }
    }


    public equals(other: Uri): boolean {
        return (
            this._scheme === other._scheme &&
            this._userName === other._userName &&
            this._password === other._password &&
            this._host === other._host &&
            this._port === other._port &&
            this._path === other._path &&
            this._query.equals(other._query) &&
            this._fragment === other._fragment
        );
    }


    public toString(): string {
        let uriBuilder: StringBuilder = new StringBuilder();

        if (this.host) {
            if (this.scheme) {
                uriBuilder.append(Uri.encodeComponent(this.scheme) + '://');
            }

            if (this.userName && this.password) {
                uriBuilder.append(Uri.encodeComponent(this.userName));

                if (this.password) {
                    uriBuilder.append(Uri.AUTH_SEGMENTS_DELIMITER + Uri.encodeComponent(this.password));
                }

                uriBuilder.append(Uri.AUTH_SEGMENTS_SUFFIX);
            }

            uriBuilder.append(Uri.encode(this.host));
        }

        if ((this.isAbsolute && !this.isDefaultPort) || (!this.scheme && this.host && this.port)) {
            uriBuilder.append(Uri.PORT_PREFIX + this.port);
        }

        uriBuilder.append(Uri.encode(this._path));

        if (this.host && this.query.length > 0) {
            uriBuilder.append(Uri.QUERY_PARAMS_PREFIX + this.query.toString());
        }

        if (this.host && this.fragment) {
            uriBuilder.append(Uri.FRAGMENT_PREFIX + Uri.encode(this.fragment));
        }

        return uriBuilder.toString();
    }


    public toJSON(): string {
        return this.toString();
    }


    public clone(): Uri {
        return new Uri(this.toString());
    }


    protected getBaseComponents(uri: string): string[] {
        let baseComponents: RegExpExecArray | null = Uri.URI_PATTERN.exec(uri);

        if (baseComponents == null) {
            throw new UriFormatException(`URI format is not valid.`);
        }

        let [, , scheme, authority, path, , query, , fragment] = baseComponents;

        return [
            scheme || EMPTY_STRING,
            authority || EMPTY_STRING,
            path || Uri.ROOT_PATH,
            query || EMPTY_STRING,
            fragment || EMPTY_STRING
        ];
    }


    protected getAuthorityComponents(authority: string): string[] {
        let authorityComponents: RegExpExecArray | null = Uri.URI_AUTHORITY_PATTERN.exec(authority);

        if (authorityComponents == null) {
            throw new UriFormatException(`Invalid URI authority format.`);
        }

        let [, , userName, , password, host, , port] = authorityComponents;

        return [
            userName || EMPTY_STRING,
            password || EMPTY_STRING,
            host || EMPTY_STRING,
            port || EMPTY_STRING
        ];
    }


    protected normalizePath(path: string): string {
        let segments: string[];

        path = path.replace(/[\\/]+/g, Uri.PATH_SEGMENTS_DELIMITER);
        segments = path.split(Uri.PATH_SEGMENTS_DELIMITER);

        segments = segments.filter((segment: string): boolean => {
            return (segment !== EMPTY_STRING && segment !== '.');
        });

        segments.forEach((segment: string, index: number): void => {
            if (segment === '..') {
                segments.splice(index, 1);
                segments.splice(index - 1, 1);
            }
        });

        return Uri.PATH_SEGMENTS_DELIMITER + segments.join(Uri.PATH_SEGMENTS_DELIMITER);
    }


    protected normalizePortNumber(port: string): number | undefined {
        let portNumber: number;

        if (!port) {
            if (this.scheme) {
                return Scheme.getDefaultPort(this.scheme);
            }

            return undefined;
        }

        portNumber = parseInt(port, 10);

        if (isNaN(portNumber)) {
            return undefined;
        }

        return portNumber;
    }
}
