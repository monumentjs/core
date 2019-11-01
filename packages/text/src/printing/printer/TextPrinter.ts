import { ToString } from '@monument/core';
import { Printable } from '../Printable';
import { Printer } from '../Printer';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class TextPrinter implements Printer<ToString>, Printable<ToString>, ToString {
  private content: Array<ToString> = [];

  append(content: ToString): this {
    this.content.push(content);

    return this;
  }

  print(printer: Printer<ToString>): void {
    printer.append(this);
  }

  toString(): string {
    return this.content.map(chunk => chunk.toString()).join('');
  }
}
