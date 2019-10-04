import { argument } from '@monument/assert';
import { Equatable } from '@monument/comparison';
import { Component } from './Component';

interface SchemeDefaults {
  [scheme: string]: {
    host: string;
    port?: number;
  };
}

const DEFAULTS: SchemeDefaults = {
  file: {
    host: 'localhost'
  },
  ftp: {
    host: 'localhost',
    port: 21
  },
  http: {
    host: 'localhost',
    port: 80
  },
  https: {
    host: 'localhost',
    port: 443
  },
  smtp: {
    host: 'localhost',
    port: 25
  },
  ssh: {
    host: 'localhost',
    port: 22
  },
  telnet: {
    host: 'localhost',
    port: 23
  }
};

/**
 * @author Alex Chugaev
 * @since 0.15.0
 */
export class Scheme implements Component<string | undefined>, Equatable<Scheme> {
  static readonly FILE = new Scheme('file');
  static readonly FTP = new Scheme('ftp');
  static readonly HTTP = new Scheme('http');
  static readonly HTTPS = new Scheme('https');
  static readonly SSH = new Scheme('ssh');
  static readonly TELNET = new Scheme('telnet');
  static readonly SMTP = new Scheme('smtp');

  readonly value: string | undefined;
  readonly isDefined: boolean;

  readonly defaultHost?: string;
  readonly defaultPort?: number;

  constructor(scheme?: string) {
    if (scheme != null) {
      argument(scheme.length > 0);

      this.value = scheme.toLowerCase();

      const _defaults = DEFAULTS[this.value];
      const _defaultHost = _defaults ? _defaults.host : undefined;
      const _defaultPort = _defaults ? _defaults.port : undefined;

      this.defaultHost = _defaultHost;
      this.defaultPort = _defaultPort;
    }

    this.isDefined = this.value != null;
  }

  equals(other: Scheme): boolean {
    return this.value === other.value;
  }

  toString(): string {
    if (this.value) {
      return this.value;
    } else {
      return '';
    }
  }

  toJSON(): string | undefined {
    return this.value;
  }

  isDefaultHost(host: string): boolean {
    return this.defaultHost === host;
  }

  isDefaultPort(port: number): boolean {
    return this.defaultPort === port;
  }
}
