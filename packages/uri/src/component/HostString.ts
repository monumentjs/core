import { TextPrinter } from '@monument/text';
import { Host } from './Host';
import { HostObject } from './HostObject';

export class HostString implements Host {
  private readonly host: Host;

  get present(): boolean {
    return this.host.present;
  }

  get value(): string | undefined {
    return this.host.value;
  }

  constructor(host: string | undefined) {
    this.host = new HostObject(host != null ? decodeURIComponent(host) : undefined);
  }

  equals(other: Host): boolean {
    return this.host.equals(other);
  }

  toString(): string {
    return this.host.toString();
  }

  print(printer: TextPrinter): void {
    this.host.print(printer);
  }
}
