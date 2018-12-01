import {
    EqualityComparator,
    Equatable,
    EquatableComparator,
    IgnoreCaseEqualityComparator,
    ChainedEqualityComparator,
    PreserveCaseEqualityComparator,
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
import {UriBuilder} from './UriBuilder';
import {QueryParametersObject} from './QueryParametersObject';


/**
 * Represents URI (Unified Resource Identifier).
 * The implementation is immutable, any change produce a new Uri instance.
 *
 * Parse URI string:
 *
 * ```ts
 * const uri = new Uri('https://my-blog.com/post/12312#cut');
 * uri.schema               // 'https'
 * uri.host                 // 'my-blog.com'
 * uri.path                 // '/post/12312'
 * uri.fragment             // 'cut'
 * ```
 *
 * Immutable operations:
 *
 * ```ts
 * const baseUri = new Uri('https://my-blog.com');
 * const articleUri = baseUri.withPath('/post/132');
 * const cutArticleUri = articleUri.withFragment('cut');
 * baseUri.toString()       // 'https://my-blog.com'
 * articleUri.toString()    // 'https://my-blog.com/post/132'
 * cutArticleUri.toString() // 'https://my-blog.com/post/132#cut'
 * ```
 *
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
     * Creates URI pointing to root location ("/").
     * @throws UriFormatException
     */
    public constructor();

    /**
     * Creates URI by parsing source string.
     * @throws UriFormatException
     */
    public constructor(source: string);

    /**
     * Creates URI by copying components from source.
     * @throws UriIntegrityException
     */
    public constructor(source: UriComponents);

    public constructor(source: UriComponents | string = UriConstants.PATH_FRAGMENT_DELIMITER) {
        const components: UriComponents = typeof source === 'object' ? source : new UriParser().parse(source);
        const normalizedComponents: UriComponents = new UriComponentsNormalizer().normalize(components);

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

    public getParameter(name: string): ToString | undefined;

    public getParameter(name: string, fallback: ToString): ToString;

    public getParameter(name: string, fallback?: ToString): ToString | undefined {
        const value: ToString | undefined = this._queryParameters.getFirst(name);

        if (value != null) {
            return value;
        }

        if (fallback != null) {
            return fallback;
        }
    }

    public hasParameter(name: string): boolean;

    public hasParameter(name: string, value: ToString): boolean;

    public hasParameter(name: string, value?: ToString): boolean {
        if (value == null) {
            return this._queryParameters.containsKey(name);
        } else {
            return this._queryParameters.containsEntry(name, value);
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
        if (this === other) {
            return true;
        }

        const textComparator: EqualityComparator<string> = ignoreCase ?
            IgnoreCaseEqualityComparator.get() :
            PreserveCaseEqualityComparator.get();
        const comparator = new ChainedEqualityComparator();
        const components: UriComponents = typeof other === 'object' ? other : new Uri(other);

        comparator.withField(this.schema, components.schema, textComparator);
        comparator.withField(this.userName, components.userName, textComparator);
        comparator.withField(this.password, components.password, textComparator);
        comparator.withField(this.host, components.host, textComparator);
        comparator.withField(this.port, components.port);
        comparator.withField(this.path, components.path, textComparator);
        comparator.withField(this.fragment, components.fragment, textComparator);
        comparator.withField(this.queryParameters, (components.queryParameters || new QueryParameters()), new EquatableComparator());

        return comparator.result;
    }

    public toJSON(): string {
        return this.toString();
    }

    public toString(): string {
        return new UriSerializer().serialize(this);
    }

    /**
     * Produces new URI based on current definition with overridden fragment component.
     *
     * Usage example:
     *
     * ```ts
     * const baseUri = new Uri('https://my-blog.com/blog/article/14');
     * const cutUri = baseUri.withFragment('cut');
     *
     * baseUri.toString()       // 'https://my-blog.com/blog/article/14'
     * cutUri.toString()        // 'https://my-blog.com/blog/article/14#cut'
     * ```
     *
     * @nosideeffects
     */
    public withFragment(fragment: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.fragment = fragment;

        return builder.build();
    }

    public withHost(host: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.host = host;

        return builder.build();
    }

    public withParameter(name: string, value: ToString): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.addParameter(name, value);

        return builder.build();
    }

    public withParameters(parameters: QueryParametersObject): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.setParameters(parameters);

        return builder.build();
    }

    public withPassword(password: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.password = password;

        return builder.build();
    }

    public withPath(path: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.path = path;

        return builder.build();
    }

    public withPort(port: number): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.port = port;

        return builder.build();
    }

    public withSchema(schema: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.schema = schema;

        return builder.build();
    }

    public withUserName(userName: string): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.userName = userName;

        return builder.build();
    }

    public withoutFragment(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.fragment = undefined;

        return builder.build();
    }

    public withoutHost(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.host = undefined;

        return builder.build();
    }

    public withoutParameter(name: string): Uri;

    public withoutParameter(name: string, value: ToString): Uri;

    public withoutParameter(name: string, value?: ToString): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        if (value == null) {
            builder.removeParameter(name);
        } else {
            builder.removeParameter(name, value);
        }

        return builder.build();
    }

    public withoutParameters(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.clearParameters();

        return builder.build();
    }

    public withoutPassword(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.password = undefined;

        return builder.build();
    }

    public withoutPath(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.path = undefined;

        return builder.build();
    }

    public withoutPort(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.port = undefined;

        return builder.build();
    }

    public withoutSchema(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.schema = undefined;

        return builder.build();
    }

    public withoutUserName(): Uri {
        const builder: UriBuilder = new UriBuilder(this);

        builder.userName = undefined;
        builder.password = undefined;

        return builder.build();
    }

    // tslint:disable-next-line:cyclomatic-complexity
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
