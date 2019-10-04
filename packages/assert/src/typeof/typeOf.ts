import { TypeOfResult } from './TypeOfResult';

export function typeOf(value: any, required: TypeOfResult, ...optional: TypeOfResult[]): boolean {
  return [required, ...optional].includes(typeof value);
}
