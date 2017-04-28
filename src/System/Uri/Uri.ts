import {ICloneable, IEquatable, IJSONSerializable} from '../../Core/types';
import {StringBuilder} from '../../Core/Text/StringBuilder';
import {QueryParamsCollection} from './QueryParamsCollection';
import {QueryStringParser} from './QueryStringParser';
import {UriFormatException} from './UriFormatException';
import {DefaultSchemePort} from './DefaultSchemePort';
import {InvalidOperationException} from '../../Core/Exceptions/InvalidOperationException';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export const URI_PATH_SEGMENTS_DELIMITER: string = '/';
export const URI_PATTERN: RegExp = /^(([^:/?#]+):\/\/)?([^/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?$/;
export const URI_AUTHORITY_PATTERN: RegExp = /^(([^:@]+)(:([^@]+))?@)?([^:]+)(:([\d]+))?$/;


// console.log(URI_PATTERN.exec('https://alex:test_pass@mysite.com/admin#users'));


export class Uri
    implements
    ICloneable<Uri>,
    IJSONSerializable<string>,
    IEquatable<Uri> {

    public static parse(uri: string): Uri {
        assertArgumentNotNull('uri', uri);

        return new Uri(uri);
    }


    public static validate(uri: string): boolean {
        assertArgumentNotNull('uri', uri);

        return URI_PATTERN.test(uri);
    }


    public static encode(uri: string): string {
        assertArgumentNotNull('uri', uri);

        return encodeURI(uri);
    }


    public static decode(uri: string): string {
        assertArgumentNotNull('uri', uri);

        return decodeURI(uri);
    }


    public static encodeComponent(uriComponent: string): string {
        assertArgumentNotNull('uriComponent', uriComponent);

        return encodeURIComponent(uriComponent);
    }


    public static decodeComponent(uriComponent: string): string {
        assertArgumentNotNull('uriComponent', uriComponent);

        return decodeURIComponent(uriComponent);
    }


    protected _originalUri: string = '';
    protected _scheme: string = '';
    protected _authority: string = '';
    protected _userName: string = '';
    protected _password: string = '';
    protected _host: string = '';
    protected _port: number;
    protected _path: string = '/';
    protected _query: QueryParamsCollection;
    protected _fragment: string = '';


    public get originalUri(): string {
        return this._originalUri;
    }


    public get scheme(): string {
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


    public get host(): string {
        return this._host;
    }


    public get port(): number {
        return this._port;
    }


    public get path(): string {
        return this._path;
    }


    public get query(): QueryParamsCollection {
        return this._query;
    }


    public get fragment(): string {
        return this._fragment;
    }


    public get isAbsolute(): boolean {
        return !!this._scheme && !!this._authority && !!this._path;
    }


    public get isDefaultPort(): boolean {
        if (this.isAbsolute) {
            return DefaultSchemePort[this._scheme] === this._port;
        }

        throw new InvalidOperationException(
            `This instance represents a relative URI, and this property is valid only for absolute URIs.`
        );
    }


    public constructor(uri: string = '/') {
        assertArgumentNotNull('uri', uri);


        if (uri === '') {
            throw new UriFormatException('URI cannot be empty string.');
        }

        let [scheme, authority, path, query, fragment] = this.getBaseComponents(uri);

        this._originalUri = uri;
        this._scheme = Uri.decodeComponent(scheme);
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
        assertArgumentNotNull('other', other);

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

        if (this._host) {
            if (this._scheme) {
                uriBuilder.append(Uri.encodeComponent(this._scheme) + '://');
            }

            if (this._userName) {
                uriBuilder.append(Uri.encodeComponent(this._userName));

                if (this._password) {
                    uriBuilder.append(':' + Uri.encodeComponent(this.password));
                }
            }

            uriBuilder.append(Uri.encode(this._host));
        }

        if ((this.isAbsolute && !this.isDefaultPort) || (!this._scheme && this._host && this._port)) {
            uriBuilder.append(':' + this._port);
        }

        uriBuilder.append(Uri.encode(this._path));

        if (this._host && this._query.length > 0) {
            uriBuilder.append('?' + this._query.toString());
        }

        if (this._host && this._fragment) {
            uriBuilder.append('#' + Uri.encode(this._fragment));
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
        let baseComponents: RegExpExecArray = URI_PATTERN.exec(uri);

        if (!baseComponents) {
            throw new UriFormatException(`URI format is not valid.`);
        }

        let [, , scheme, authority, path, , query, , fragment] = baseComponents;

        return [scheme || '', authority || '', path || '/', query || '', fragment || ''];
    }


    protected getAuthorityComponents(authority: string): string[] {
        let authorityComponents: RegExpExecArray = URI_AUTHORITY_PATTERN.exec(authority);

        if (!authorityComponents) {
            throw new UriFormatException(`URI format is not valid.`);
        }

        let [, , userName, , password, host, , port] = authorityComponents;

        return [userName || '', password || '', host || '', port || ''];
    }


    protected normalizePath(path: string): string {
        let segments: string[];

        path = path.replace(/[\\/]+/g, URI_PATH_SEGMENTS_DELIMITER);
        segments = path.split(URI_PATH_SEGMENTS_DELIMITER);

        segments = segments.filter((segment: string): boolean => {
            return (segment !== '' && segment !== '.');
        });

        segments.forEach((segment: string, index: number): void => {
            if (segment === '..') {
                segments.splice(index, 1);
                segments.splice(index - 1, 1);
            }
        });

        return URI_PATH_SEGMENTS_DELIMITER + segments.join(URI_PATH_SEGMENTS_DELIMITER);
    }


    protected normalizePortNumber(port: string): number {
        let portNumber: number;

        if (!port) {
            if (this._scheme) {
                return DefaultSchemePort[this._scheme.toLowerCase()];
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