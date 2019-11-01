import { argument } from '@monument/assert';
import { TextPrinter } from '@monument/text';
import { Port } from './Port';

export class PortObject implements Port {
  readonly value: number | undefined;
  readonly present: boolean = false;

  constructor(port?: number) {
    if (port != null) {
      argument(!isNaN(port));
      argument(Number.isFinite(port));
      argument(Number.isSafeInteger(port));
      argument(port >= 0 && port <= 65535);

      this.value = port;
      this.present = true;
    }
  }

  equals(other: Port): boolean {
    return this.value === other.value;
  }

  toJSON(): number | undefined {
    return this.value;
  }

  toString(): string {
    return this.value != null ? this.value.toString(10) : '';
  }

  print(printer: TextPrinter): void {
    printer.append(this);
  }
}
