import { ToJSON, ToString } from '@monument/core';
import { Equatable, EquatableEquals, MultiValueEquals } from '@monument/comparison';
import { StringBuilder } from '@monument/text';
import { Components, Fragment, Host, Password, Path, Port, Query, Scheme, UserName } from './component';
import { UriFormatException } from './exception';
import { KeyValuePair } from '@monument/collections';

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
export class Uri implements Equatable<Uri>, ToJSON<string>, ToString {
  private readonly components: Components;

  /**
   * Gets fragment component.
   */
  get fragment(): Fragment {
    return this.components.fragment;
  }

  /**
   * Gets host component.
   */
  get host(): Host {
    return this.components.host;
  }

  /**
   * Gets password component.
   */
  get password(): Password {
    return this.components.password;
  }

  /**
   * Gets path component of this URI.
   */
  get path(): Path {
    return this.components.path;
  }

  /**
   * Gets port component of this URI.
   */
  get port(): Port {
    return this.components.port;
  }

  /**
   * Gets read-only access to query parameters of this URI.
   */
  get query(): Query {
    return this.components.query;
  }

  /**
   * Gets scheme component of this URI.
   */
  get scheme(): Scheme {
    return this.components.scheme;
  }

  /**
   * Gets user name component of this URI.
   */
  get userName(): UserName {
    return this.components.userName;
  }

  /**
   * Creates URI by parsing source string.
   * @throws {UriFormatException} if URI represented by source string is has wrong format
   */
  constructor(components: Components) {
    this.components = components;
  }

  equals(other: Uri): boolean {
    if (this === other) {
      return true;
    }

    return MultiValueEquals([
      [this.scheme, other.scheme, EquatableEquals],
      [this.userName, other.userName, EquatableEquals],
      [this.password, other.password, EquatableEquals],
      [this.host, other.host, EquatableEquals],
      [this.port, other.port, EquatableEquals],
      [this.path, other.path, EquatableEquals],
      [this.fragment, other.fragment, EquatableEquals],
      [this.query, other.query, EquatableEquals]
    ]);
  }

  /**
   * Serializes current URI to string.
   */
  toJSON(): string {
    return this.toString();
  }

  /**
   * Serializes current URI to string.
   */
  toString(): string {
    const builder = new StringBuilder();

    if (this.scheme.isDefined) {
      builder.appendObject(this.scheme);
      builder.append('://');
    }

    if (this.host.isDefined) {
      if (this.userName.isDefined) {
        builder.appendObject(this.userName);

        if (this.password.isDefined) {
          builder.append(':');
          builder.appendObject(this.password);
        }

        builder.append('@');
      }

      builder.appendObject(this.host);

      if (this.port.isDefined) {
        builder.append(':');
        builder.appendObject(this.port);
      }
    }

    if (this.path.isDefined) {
      builder.appendObject(this.path);
    }

    if (this.query.isDefined) {
      builder.append('?');
      builder.appendObject(this.query);
    }

    if (this.fragment.isDefined) {
      builder.append('#');
      builder.appendObject(this.fragment);
    }

    return builder.build();
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
    return new Uri(this.components.clone({
      fragment: new Fragment(fragment)
    }));
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
    return new Uri(this.components.clone({
      host: new Host(host)
    }));
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
    return new Uri(this.components.clone({
      query: this.query.withParameter(name, value)
    }));
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
  withQuery(parameters: Iterable<KeyValuePair<string, ToString>>): Uri {
    return new Uri(this.components.clone({
      query: new Query(parameters)
    }));
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
    return new Uri(this.components.clone({
      password: new Password(password)
    }));
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
    return new Uri(this.components.clone({
      path: new Path(path)
    }));
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
    return new Uri(this.components.clone({
      port: new Port(port)
    }));
  }

  /**
   * Produces new URI based on current definition with overridden scheme component.
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
  withScheme(scheme: string): Uri {
    return new Uri(this.components.clone({
      scheme: new Scheme(scheme)
    }));
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
    return new Uri(this.components.clone({
      userName: new UserName(userName)
    }));
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
    return new Uri(this.components.clone({
      fragment: new Fragment()
    }));
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
    return new Uri(this.components.clone({
      host: new Host()
    }));
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
    return new Uri(this.components.clone({
      query: this.components.query.withoutParameter(name, value as any)
    }));
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
    return new Uri(this.components.clone({
      query: new Query()
    }));
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
    return new Uri(this.components.clone({
      password: new Password()
    }));
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
    return new Uri(this.components.clone({
      path: new Path()
    }));
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
    return new Uri(this.components.clone({
      port: new Port()
    }));
  }

  /**
   * Produces new URI based on current definition without scheme component.
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
  withoutScheme(): Uri {
    return new Uri(this.components.clone({
      scheme: new Scheme()
    }));
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
    return new Uri(this.components.clone({
      userName: new UserName(),
      password: new Password()
    }));
  }
}
