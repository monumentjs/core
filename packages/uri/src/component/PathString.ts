import { Path } from './Path';

export class PathString implements Path {
  readonly segments: ReadonlyArray<string> = [];

  constructor(readonly source: string) {
    this.segments = source
      .split(/[\\\/]+/g)
      // Remove all empty segments except first one
      // (if present, because leading empty segment mean path is absolute)
      .filter((val, i) => !(i > 0 && val.length === 0))
      // Remove all "." segments except first one
      .filter((val, i) => !(i > 0 && val === '.'))
      // Collapse "return" path segments
      .filter((val, i, arr) => !(i > 1 && val === '..' && arr[i - 1] !== '..') && !(i > 0 && val !== '..' && arr[i + 1] === '..'))
      // Remove leading "." segment when followed by ".."
      .filter((val, i, err) => !(i === 0 && val === '.' && err[i + 1] === '..'))
      // Decode segments
      .map(decodeURI);
  }

  toString() {
    return this.segments.map(encodeURI).join('/');
  }

  toJSON(): string {
    return this.toString();
  }
}
