import { EquatableEquals } from '@monument/comparison';
import { ReadOnlyList } from '@monument/collections';
import { TextPrinter } from '@monument/text';
import { Path } from './Path';
import { PathSegment } from './PathSegment';

export class PathObject implements Path {
  readonly present: boolean;
  // TODO: calculate
  readonly extension: string = '';

  constructor(
    readonly segments: ReadOnlyList<PathSegment>
  ) {
    this.present = segments.length > 0;
  }

  equals(other: Path): boolean {
    return this.segments.equals(other.segments, EquatableEquals);
  }

  toString(): string {
    // TODO: use JoinCollector
    return this.segments.map(segment => segment.toString()).toArray().join('/');
  }

  print(printer: TextPrinter): void {
    printer.append(this);
  }

  // TODO: isRelative, isAbsolute, segments
}
