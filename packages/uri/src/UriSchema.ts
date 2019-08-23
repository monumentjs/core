import { Equatable, IgnoreCaseEquals, ToJSON, ToString } from '@monument/core';

const FILE_DEFAULT_HOST = 'localhost';

const FTP_DEFAULT_PORT = 21;
const FTP_DEFAULT_HOST = 'localhost';

const HTTP_DEFAULT_PORT = 80;
const HTTP_DEFAULT_HOST = 'localhost';

const HTTPS_DEFAULT_PORT = 443;
const HTTPS_DEFAULT_HOST = 'localhost';

const SMTP_DEFAULT_PORT = 25;
const SMTP_DEFAULT_HOST = 'localhost';

const SSH_DEFAULT_PORT = 22;
const SSH_DEFAULT_HOST = 'localhost';

const TELNET_DEFAULT_PORT = 23;
const TELNET_DEFAULT_HOST = 'localhost';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriSchema implements Equatable<UriSchema>, Equatable<string | undefined>, ToString, ToJSON<string> {
  private static _knownSchemes?: UriSchema[];
  static readonly UNKNOWN = new UriSchema();
  static readonly FILE = new UriSchema('file', FILE_DEFAULT_HOST);
  static readonly FTP = new UriSchema('ftp', FTP_DEFAULT_HOST, FTP_DEFAULT_PORT);
  static readonly HTTP = new UriSchema('http', HTTP_DEFAULT_HOST, HTTP_DEFAULT_PORT);
  static readonly HTTPS = new UriSchema('https', HTTPS_DEFAULT_HOST, HTTPS_DEFAULT_PORT);
  static readonly SSH = new UriSchema('ssh', SSH_DEFAULT_HOST, SSH_DEFAULT_PORT);
  static readonly TELNET = new UriSchema('telnet', TELNET_DEFAULT_HOST, TELNET_DEFAULT_PORT);
  static readonly SMTP = new UriSchema('smtp', SMTP_DEFAULT_HOST, SMTP_DEFAULT_PORT);

  private static get knownSchemes() {
    if (this._knownSchemes == null) {
      this._knownSchemes = [this.UNKNOWN, this.FILE, this.FTP, this.HTTP, this.HTTPS, this.SSH, this.TELNET, this.SMTP];
    }

    return this._knownSchemes;
  }

  static resolve(scheme: string | undefined): UriSchema {
    for (const knownScheme of this.knownSchemes) {
      if (knownScheme.equals(scheme)) {
        return knownScheme;
      }
    }

    return new UriSchema(scheme);
  }

  private readonly _name?: string;
  private readonly _defaultHost?: string;
  private readonly _defaultPort?: number;

  get defaultHost(): string | undefined {
    return this._defaultHost;
  }

  get defaultPort(): number | undefined {
    return this._defaultPort;
  }

  get name(): string | undefined {
    return this._name;
  }

  private constructor(name?: string, defaultHost?: string, defaultPort?: number) {
    this._name = name;
    this._defaultHost = defaultHost;
    this._defaultPort = defaultPort;
  }

  equals(other: string | undefined): boolean;
  equals(other: UriSchema): boolean;
  equals(other: UriSchema | string | undefined): boolean {
    const schemeName: string | undefined = typeof other === 'object' ? other.name : other;

    return IgnoreCaseEquals(this._name, schemeName);
  }

  isDefaultHost(host: string): boolean {
    return this.defaultHost === host;
  }

  isDefaultPort(port: number): boolean {
    return this.defaultPort === port;
  }

  toJSON(): string {
    return this.toString();
  }

  toString(): string {
    return this.name || '';
  }
}
