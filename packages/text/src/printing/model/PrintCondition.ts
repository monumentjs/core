import { Delegate } from '@monument/core';
import { Printable } from '../Printable';
import { TextPrinter } from '../printer/TextPrinter';

export class PrintCondition implements Printable {
  constructor(private condition: Delegate<[], boolean>, private printable: Printable) {
  }

  print(printer: TextPrinter): void {
    if (this.condition()) {
      this.printable.print(printer);
    }
  }
}
