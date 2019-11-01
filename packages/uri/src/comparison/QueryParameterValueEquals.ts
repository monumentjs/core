import { ToString } from '@monument/core';
import { PreserveCaseEquals } from '@monument/comparison';

export function QueryParameterValueEquals(x: ToString | null | undefined, y: ToString | null | undefined): boolean {
  return PreserveCaseEquals(x != null ? x.toString() : undefined, y != null ? y.toString() : undefined);
}
