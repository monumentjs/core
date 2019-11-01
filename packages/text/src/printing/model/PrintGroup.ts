import { Printable } from '../Printable';
import { Printer } from '../Printer';

export class PrintGroup<T> implements Printable<T> {
  constructor(private elements: Iterable<Printable<T>>) {
  }

  print(printer: Printer<T>): void {
    for (const printable of this.elements) {
      printable.print(printer);
    }
  }
}
