export type TypeOfResult = 'string' | 'boolean' | 'number' | 'object' | 'undefined' | 'symbol' | 'bigint' | 'function';

export function typeOf(value: any, required: TypeOfResult, ...optional: TypeOfResult[]): boolean {
  return [required, ...optional].includes(typeof value);
}
