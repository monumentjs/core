import {
    EqualityComparator,
    Equatable,
    EquatableComparator,
    IgnoreCaseEqualityComparator,
    ObjectEqualityComparator,
    PreserveCaseEqualityComparator,
    ReadOnlyList,
    ToJSON,
    ToString
} from '@monument/core';
import {UriComponents} from './UriComponents';
import {UriComponentsNormalizer} from './UriComponentsNormalizer';
import {ReadOnlyQueryParameters} from './ReadOnlyQueryParameters';
import {QueryParameters} from './QueryParameters';
import {UriFormatException} from './UriFormatException';
import {UriIntegrityException} from './UriIntegrityException';
import {UriSchema} from './UriSchema';
import {UriSerializer} from './UriSerializer';
import {UriConstants} from './UriConstants';
import {UriParser} from './UriParser';


/**
 * @since 0.0.1
 * @author Alex Chugaev
 * @immutable
 * @final
 */
export class Uri implements UriComponents, Equatable<UriComponents>, Equatable<string>, ToJSON<string>, ToString {
    public static isValid(source: string): boolean {
        return UriConstants.URI_PATTERN.test(source);
    }

    private readonly _schema?: string;
    private readonly _userName?: string;
    private readonly _password?: string;
    private readonly _host?: string;
    private readonly _port?: number;
    private readonly _path: string;
    private readonly _fragment?: string;
    private readonly _queryParameters: QueryParameters;
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

    public get path(): string {
        return this._path;
    }

    public get port(): number | undefined {
        return this._port;
    }

    public get queryParameters(): ReadOnlyQueryParameters {
        return this._queryParameters;
    }

    public get schema(): string | undefined {
        return this._schema;
    }

    public get userName(): string | undefined {
        return this._userName;
    }

    /**
     * Creates URI by parsing source string.
     * @throws {UriFormatException}
     */
    public constructor(source: string);

    /**
     * Creates URI by copying components from source.
     * @throws {UriIntegrityException}
     */
    public constructor(source: UriComponents);

    public constructor(source: UriComponents | string) {
        const components: UriComponents = typeof source === 'object' ? source : new UriParser().parse(source);
        const normalizedComponents = new UriComponentsNormalizer().normalize(components);

        this._schema = normalizedComponents.schema;
        this._userName = normalizedComponents.userName;
        this._password = normalizedComponents.password;
        this._host = normalizedComponents.host;
        this._port = normalizedComponents.port;
        this._path = normalizedComponents.path || UriConstants.PATH_FRAGMENT_DELIMITER;
        this._fragment = normalizedComponents.fragment;
        this._queryParameters = new QueryParameters();

        if (normalizedComponents.queryParameters) {
            this._queryParameters.putAll(normalizedComponents.queryParameters);
        }

        this.validateIntegrity();
    }

    /**
     * Determines whether URI contains query parameter with specified name.
     */
    public containsParameter(name: string): boolean;

    /**
     * Determines whether URI contains query parameter with specified name and value.
     */
    public containsParameter(name: string, value: ToString): boolean;

    public containsParameter(name: string, value?: ToString): boolean {
        if (value == null) {
            return this._queryParameters.containsKey(name);
        } else {
            return this._queryParameters.containsEntry(name, value.toString());
        }
    }

    /**
     * Determines whether current URI equals to other one represented as string.
     */
    public equals(other: string): boolean;

    /**
     * Determines whether current URI equals to other one represented as set of URI components.
     */
    public equals(other: UriComponents): boolean;

    /**
     * Determines whether current URI equals to other one represented as set of URI components.
     * Second parameter specifies when to ignore case of components.
     */
    public equals(other: UriComponents, ignoreCase: boolean): boolean;

    public equals(other: UriComponents | string, ignoreCase: boolean = false): boolean {
        const textComparator: EqualityComparator<string> = ignoreCase ?
            IgnoreCaseEqualityComparator.get() :
            PreserveCaseEqualityComparator.get();
        const comparator = new ObjectEqualityComparator<ToString | UriComponents>(this, other);
        const components: UriComponents = typeof other === 'object' ? other : new Uri(other);

        comparator.withField(this.schema, components.schema, EquatableComparator.get());
        comparator.withField(this.userName, components.userName, textComparator);
        comparator.withField(this.password, components.password, textComparator);
        comparator.withField(this.host, components.host, textComparator);
        comparator.withField(this.port, components.port);
        comparator.withField(this.path, components.path, textComparator);
        comparator.withField(this.fragment, components.fragment, textComparator);
        comparator.withField(this.queryParameters, components.queryParameters || new QueryParameters(), EquatableComparator.get());

        return comparator.result;
    }

    /**
     * Returns first value of query parameter with specified name.
     */
    public getParameterValue(name: string): string | undefined;

    /**
     * Returns first value of query parameter with specified name.
     * If no value(s) stored under specified name, default value will be returned.
     */
    public getParameterValue(name: string, defaultValue: ToString): string;

    public getParameterValue(name: string, defaultValue?: ToString): string | undefined {
        const value: string | undefined = this._queryParameters.getFirst(name);

        if (value != null) {
            return value;
        }

        if (defaultValue != null) {
            return defaultValue.toString();
        }
    }

    public getParameterValues(name: string): ReadOnlyList<string> {
        return this._queryParameters.get(name);
    }

    public toJSON(): string {
        return this.toString();
    }

    public toString(): string {
        // Check is disabled because logic is primitive
        /* tslint:disable:cyclomatic-complexity */
        if (this._serialized == null) {
            this._serialized = new UriSerializer().serialize(this);
        }

        return this._serialized;
    }

    private validateIntegrity(): void {
        if (!this.host) {
            if (!UriSchema.FILE.equals(this.schema)) {
                if (this.schema || this.userName || this.password || this.port) {
                    throw new UriIntegrityException('URI components integrity is broken');
                }
            }
        }
    }
}
