import { ToString } from '@monument/core';

export function QueryParameterValueEquals(x: ToString | undefined, y: ToString | undefined): boolean {
  if (x == null && y == null) {
    return true;
  }

  if (x == null || y == null) {
    return false;
  }

  return x.toString() === y.toString();
}
