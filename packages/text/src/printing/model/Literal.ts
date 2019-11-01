import { ToString } from '@monument/core';
import { Printable } from '../Printable';
import { Printer } from '../Printer';

export class Literal implements ToString, Printable<ToString> {
  constructor(readonly content: ToString) {
  }

  toString(): string {
    return this.content.toString();
  }

  print(printer: Printer<ToString>): void {
    printer.append(this.content);
  }
}
