import { EqualityComparator } from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class PreserveCaseEqualityComparator implements EqualityComparator<string | null | undefined> {
  private static _instance: PreserveCaseEqualityComparator | undefined;

  static get(): PreserveCaseEqualityComparator {
    if (this._instance == null) {
      this._instance = new PreserveCaseEqualityComparator();
    }

    return this._instance;
  }

  private constructor() {}

  equals(current: string | null | undefined, other: string | null | undefined): boolean {
    if (current == null && other == null) {
      return true;
    }

    if (current == null || other == null) {
      return false;
    }

    return current === other;
  }
}
