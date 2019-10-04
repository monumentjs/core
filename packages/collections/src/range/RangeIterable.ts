
export class RangeIterable implements Iterable<number> {
  readonly from: number;
  readonly to: number;
  readonly step: number;

  constructor(from: number, to: number, step: number = 1) {
    this.from = from;
    this.to = to;
    this.step = step;
  }

  *[Symbol.iterator](): Iterator<number> {
    const { from, to, step } = this;

    for (let value = from; value < to; value += step) {
      yield value;
    }
  }
}
