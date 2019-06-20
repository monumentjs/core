import { EqualityComparator, ToString } from '@monument/core';

export class QueryParameterValueEqualityComparator implements EqualityComparator<ToString | undefined> {
  private static _instance: QueryParameterValueEqualityComparator | undefined;

  static get(): QueryParameterValueEqualityComparator {
    if (this._instance == null) {
      this._instance = new QueryParameterValueEqualityComparator();
    }

    return this._instance;
  }

  private constructor() {}

  equals(x: ToString | undefined, y: ToString | undefined): boolean {
    if (x == null && y == null) {
      return true;
    }

    if (x == null || y == null) {
      return false;
    }

    return x.toString() === y.toString();
  }
}
