import { ToString } from '@monument/core';
import { Printable } from '../Printable';
import { TextPrinter } from '../printer/TextPrinter';

export class Line implements ToString, Printable {
  constructor(readonly content: ToString = '', readonly delimiter: string = '\r\n') {
  }

  print(printer: TextPrinter): void {
    printer.append(this.content);
    printer.append(this.delimiter);
  }

  toString(): string {
    return this.content.toString();
  }
}
