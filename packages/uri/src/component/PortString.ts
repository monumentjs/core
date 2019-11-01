import { TextPrinter } from '@monument/text';
import { Port } from './Port';
import { PortObject } from './PortObject';

export class PortString implements Port {
  private readonly port: Port;

  get present(): boolean {
    return this.port.present;
  }

  get value(): number | undefined {
    return this.port.value;
  }

  constructor(port: string | undefined) {
    this.port = new PortObject(port != null ? parseInt(port, 10) : port);
  }

  equals(other: Port): boolean {
    return this.port.equals(other);
  }

  print(printer: TextPrinter): void {
    this.port.print(printer);
  }

  toString(): string {
    return this.port.toString();
  }

  toJSON(): number | undefined {
    return this.port.toJSON();
  }
}
