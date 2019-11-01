import { argument } from '@monument/assert';
import { IgnoreCaseEquals } from '@monument/comparison';
import { TextPrinter } from '@monument/text';
import { Host } from './Host';

export class HostObject implements Host {
  readonly present: boolean = false;
  readonly value: string | undefined;

  constructor(host?: string) {
    if (host != null) {
      argument(host.length > 0);

      this.present = true;
    }

    this.value = host;
  }

  equals(other: HostObject): boolean {
    return IgnoreCaseEquals(this.value, other.value);
  }

  toString(): string {
    return this.value ? encodeURIComponent(this.value) : '';
  }

  print(printer: TextPrinter): void {
    printer.append(this);
  }
}
