import {
  EquatableEquals,
  MultiValueEquals,
  PreserveCaseEquals,
  StrictEquals,
} from '@monument/core';
import {
  EqualsFunction,
  Equatable,
  ReadOnlyQueryParameters,
  SupplyFunction,
  ToJSON,
  ToString,
  UriComponents,
  QueryParametersObject
} from '@monument/contracts';
import { UriComponentsNormalizer } from './UriComponentsNormalizer';
import { QueryParameters } from './QueryParameters';
import { UriFormatException, UriIntegrityException } from '@monument/exceptions';
import { UriSchema } from './UriSchema';
import { UriSerializer } from './UriSerializer';
import { UriConstants } from './UriConstants';
import { UriParser } from './UriParser';
import { UriBuilder } from './UriBuilder';

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
  static isValid(source: string): boolean {
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

  /**
   * Gets fragment component.
   */
  get fragment(): string | undefined {
    return this._fragment;
  }

  /**
   * Gets host component.
   */
  get host(): string | undefined {
    return this._host;
  }

  /**
   * Gets password component.
   */
  get password(): string | undefined {
    return this._password;
  }

  /**
   * Gets path component of this URI.
   */
  get path(): string {
    return this._path;
  }

  /**
   * Gets port component of this URI.
   */
  get port(): number | undefined {
    return this._port;
  }

  /**
   * Gets read-only access to query parameters of this URI.
   */
  get queryParameters(): ReadOnlyQueryParameters {
    return this._queryParameters;
  }

  /**
   * Gets schema component of this URI.
   */
  get schema(): string | undefined {
    return this._schema;
  }

  /**
   * Gets user name component of this URI.
   */
  get userName(): string | undefined {
    return this._userName;
  }

  /**
   * Creates URI pointing to root location ("/").
   */
  constructor();

  /**
   * Creates URI by parsing source string.
   * @throws {UriFormatException} if URI represented by source string is has wrong format
   */
  constructor(source: string);

  /**
   * Creates URI by copying components from source.
   * @throws {UriIntegrityException} if combination of given components is wrong
   */
  constructor(source: UriComponents);

  constructor(source: UriComponents | string = UriConstants.PATH_FRAGMENT_DELIMITER) {
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

  /**
   * Determines whether current URI equals to other one represented as string.
   * @nosideeffects
   */
  equals(other: string): boolean;

  /**
   * Determines whether current URI equals to other one represented as set of URI components.
   * @nosideeffects
   */
  equals(other: UriComponents): boolean;

  /**
   * Determines whether current URI equals to other one represented as set of URI components.
   * Second parameter specifies when to ignore case of components.
   * @nosideeffects
   */
  equals(other: UriComponents, equals: EqualsFunction<string | undefined>): boolean;

  equals(other: UriComponents | string, equals: EqualsFunction<string | undefined> = PreserveCaseEquals): boolean {
    if (this === other) {
      return true;
    }

    const components: UriComponents = typeof other === 'object' ? other : new Uri(other);

    return MultiValueEquals([
      [this.schema, components.schema, equals],
      [this.userName, components.userName, equals],
      [this.password, components.password, equals],
      [this.host, components.host, equals],
      [this.port, components.port, StrictEquals],
      [this.path, components.path, equals],
      [this.fragment, components.fragment, equals],
      [this.queryParameters, components.queryParameters || new QueryParameters(), EquatableEquals]
    ]);
  }

  getParameter(name: string): ToString | undefined;

  getParameter(name: string, fallback: SupplyFunction<ToString>): ToString;

  getParameter(name: string, fallback?: SupplyFunction<ToString>): ToString | undefined {
    const value: ToString | undefined = this._queryParameters.getFirst(name);

    if (value != null) {
      return value;
    }

    if (fallback != null) {
      return fallback();
    }
  }

  /**
   * Determines whether this URI has one or more query parameters associated with specified name.
   * @nosideeffects
   */
  hasParameter(name: string): boolean;

  /**
   * Determines whether this URI has query parameter associated with specified name and containing specified value.
   * @nosideeffects
   */
  hasParameter(name: string, value: ToString): boolean;

  hasParameter(name: string, value?: ToString): boolean {
    if (value == null) {
      return this._queryParameters.containsKey(name);
    } else {
      return this._queryParameters.containsEntry(name, value);
    }
  }

  /**
   * Serializes current URI to string.
   * @nosideeffects
   */
  toJSON(): string {
    return this.toString();
  }

  /**
   * Serializes current URI to string.
   * @nosideeffects
   */
  toString(): string {
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
  withFragment(fragment: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.fragment = fragment;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden host component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://dev.blog.com/blog/article/14');
   * const qaUri = baseUri.withHost('qa.blog.com');
   *
   * baseUri.toString()       // 'https://dev.blog.com/blog/article/14'
   * qaUri.toString()         // 'https://qa.blog.com/blog/article/14'
   * ```
   *
   * @nosideeffects
   */
  withHost(host: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.host = host;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden query parameter.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com/blog');
   * const pageUri = baseUri.withParameter('p', 2);
   *
   * baseUri.toString()       // 'https://blog.com/blog'
   * pageUri.toString()       // 'https://blog.com/blog?p=2'
   * ```
   *
   * @nosideeffects
   */
  withParameter(name: string, value: ToString): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.addParameter(name, value);

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden query parameters.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com/blog');
   * const pageUri = baseUri.withParameters({
   *     p: 2,
   *     s: 10
   * });
   *
   * baseUri.toString()       // 'https://blog.com/blog'
   * pageUri.toString()       // 'https://blog.com/blog?p=2&s=10'
   * ```
   *
   * @nosideeffects
   */
  withParameters(parameters: QueryParametersObject): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.setParameters(parameters);

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden password component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://alex@dev.blog.com');
   * const secureUri = baseUri.withPassword('secret');
   *
   * baseUri.toString()       // 'https://alex@dev.blog.com'
   * secureUri.toString()     // 'https://alex:secret@dev.blog.com'
   * ```
   *
   * @nosideeffects
   */
  withPassword(password: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.password = password;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden path component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com');
   * const postUri = baseUri.withPath('/post/12');
   *
   * baseUri.toString()       // 'https://blog.com'
   * postUri.toString()       // 'https://blog.com/post/12'
   * ```
   *
   * @nosideeffects
   */
  withPath(path: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.path = path;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden port component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com');
   * const hiddenUri = baseUri.withPort(4560);
   *
   * baseUri.toString()       // 'https://blog.com'
   * hiddenUri.toString()     // 'https://blog.com:4560'
   * ```
   *
   * @nosideeffects
   */
  withPort(port: number): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.port = port;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden schema component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('blog.com');
   * const fullUri = baseUri.withSchema('https');
   *
   * baseUri.toString()       // 'blog.com'
   * fullUri.toString()       // 'https://blog.com'
   * ```
   *
   * @nosideeffects
   */
  withSchema(schema: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.schema = schema;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition with overridden user name component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com');
   * const authUri = baseUri.withUserName('alex');
   *
   * baseUri.toString()       // 'https://blog.com'
   * authUri.toString()       // 'https://alex@blog.com'
   * ```
   *
   * @nosideeffects
   */
  withUserName(userName: string): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.userName = userName;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without fragment component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('https://blog.com/post/12#cut');
   * const postUri = baseUri.withoutFragment();
   *
   * baseUri.toString()       // 'https://blog.com/post/12#cut'
   * postUri.toString()       // 'https://blog.com/post/12'
   * ```
   *
   * @nosideeffects
   */
  withoutFragment(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.fragment = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without host component.
   *
   * Usage example:
   *
   * ```ts
   * const baseUri = new Uri('blog.com/post/12');
   * const postUri = baseUri.withoutHost();
   *
   * baseUri.toString()       // 'blog.com/post/12'
   * postUri.toString()       // '/post/12'
   * ```
   *
   * @nosideeffects
   */
  withoutHost(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.host = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without query parameter with specified name.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('https://blog.com/search?page=4&q=TypeScript');
   * const newUri = oldUri.withoutParameter('page');
   *
   * oldUri.toString()        // 'https://blog.com/search?page=4&q=TypeScript'
   * newUri.toString()        // 'https://blog.com/search?q=TypeScript'
   * ```
   *
   * @nosideeffects
   */
  withoutParameter(name: string): Uri;

  /**
   * Produces new URI based on current definition without query parameter with specified name and value.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('https://blog.com/search?q=JavaScript&q=TypeScript');
   * const newUri = oldUri.withoutParameter('q', 'JavaScript');
   *
   * oldUri.toString()        // 'https://blog.com/search?q=JavaScript&q=TypeScript'
   * newUri.toString()        // 'https://blog.com/search?q=TypeScript'
   * ```
   *
   * @nosideeffects
   */
  withoutParameter(name: string, value: ToString): Uri;

  withoutParameter(name: string, value?: ToString): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    if (value == null) {
      builder.removeParameter(name);
    } else {
      builder.removeParameter(name, value);
    }

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without query parameters.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('https://blog.com/search?q=JavaScript&q=TypeScript');
   * const newUri = oldUri.withoutParameters();
   *
   * oldUri.toString()        // 'https://blog.com/search?q=JavaScript&q=TypeScript'
   * newUri.toString()        // 'https://blog.com/search'
   * ```
   *
   * @nosideeffects
   */
  withoutParameters(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.clearParameters();

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without password component.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('alex:secure@blog.com');
   * const newUri = oldUri.withoutPassword();
   *
   * oldUri.toString()       // 'alex:secure@blog.com'
   * newUri.toString()       // 'alex@blog.com'
   * ```
   *
   * @nosideeffects
   */
  withoutPassword(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.password = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without path component.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('blog.com/search');
   * const newUri = oldUri.withoutPath();
   *
   * oldUri.toString()       // 'blog.com/search'
   * newUri.toString()       // 'blog.com'
   * ```
   *
   * @nosideeffects
   */
  withoutPath(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.path = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without port component.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('blog.com:3000');
   * const newUri = oldUri.withoutPort();
   *
   * oldUri.toString()       // 'blog.com:3000'
   * newUri.toString()       // 'blog.com'
   * ```
   *
   * @nosideeffects
   */
  withoutPort(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.port = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without schema component.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('https://blog.com');
   * const newUri = oldUri.withoutSchema();
   *
   * oldUri.toString()       // 'https://blog.com'
   * newUri.toString()       // 'blog.com'
   * ```
   *
   * @nosideeffects
   */
  withoutSchema(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.schema = undefined;

    return builder.build();
  }

  /**
   * Produces new URI based on current definition without user name component.
   *
   * Usage example:
   *
   * ```ts
   * const oldUri = new Uri('alex@blog.com');
   * const newUri = oldUri.withoutUserName();
   *
   * oldUri.toString()       // 'alex@blog.com'
   * newUri.toString()       // 'blog.com'
   * ```
   *
   * @nosideeffects
   */
  withoutUserName(): Uri {
    const builder: UriBuilder = new UriBuilder(this);

    builder.userName = undefined;
    builder.password = undefined;

    return builder.build();
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
