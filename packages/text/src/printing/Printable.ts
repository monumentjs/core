import { Printer } from './Printer';

export interface Printable<T> {
  print(printer: Printer<T>): void;
}
