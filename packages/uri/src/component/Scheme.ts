import { argument } from '@monument/assert';
import { Equatable, IgnoreCaseEquals } from '@monument/comparison';
import { TextPrinter } from '@monument/text';
import { Component } from '../base/Component';
import { HostObject } from './HostObject';
import { PortObject } from './PortObject';

export abstract class Scheme implements Component<string | undefined>, Equatable<Scheme> {
  readonly value: string | undefined;

  readonly defaultHost: HostObject;
  readonly defaultPort: PortObject;

  constructor(scheme: string | undefined, defaultHost: HostObject, defaultPort: PortObject) {
    if (scheme != null) {
      argument(scheme.length > 0);

      this.value = scheme.toLowerCase();
    }

    this.defaultHost = defaultHost;
    this.defaultPort = defaultPort;
  }

  equals(other: Scheme): boolean {
    return IgnoreCaseEquals(this.value, other.value);
  }

  is(name: string): boolean {
    return IgnoreCaseEquals(this.value, name);
  }

  isDefaultHost(host: HostObject): boolean {
    return this.defaultHost.equals(host);
  }

  isDefaultPort(port: PortObject): boolean {
    return this.defaultPort.equals(port);
  }

  toJSON(): string | undefined {
    return this.value;
  }

  serialize(out: TextPrinter): void {
    if (this.value) {
      out.append(`${this.value}:`);
    }
  }
}
