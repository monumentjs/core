import { ToString } from '@monument/core';
import { Printer } from '../Printer';
import { Printable } from '../Printable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CappedTextPrinter implements Printer<ToString>, Printable<ToString>, ToString {
  private value: string = '';

  constructor(readonly capacity: number) {
  }

  append(text: ToString): void {
    this.value += text.toString();
    this.value = this.value.slice(-this.capacity);
  }

  toString(): string {
    return this.value;
  }

  print(printer: Printer<ToString>): void {
    printer.append(this);
  }
}
