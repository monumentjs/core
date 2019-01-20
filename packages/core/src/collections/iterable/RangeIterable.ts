

export class RangeIterable implements Iterable<number> {
    public readonly from: number;
    public readonly to: number;
    public readonly step: number;

    public constructor(from: number, to: number, step: number = 1) {
        this.from = from;
        this.to = to;
        this.step = step;
    }

    public *[Symbol.iterator](): Iterator<number> {
        const {from, to, step} = this;

        for (let value = from; value < to; value += step) {
            yield value;
        }
    }

}
