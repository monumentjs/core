import {InvalidArgumentException} from '../exceptions/InvalidArgumentException';
import {Assert} from '../assert/Assert';
import {ArrayList} from './ArrayList';
import {List} from './List';


export class ListGenerator {
    public static range(start: number, end: number, step: number = 1): List<number> {
        Assert.range(start, end).bounds();

        if (step === ZERO) {
            throw new InvalidArgumentException('step', `Step cannot be equal to zero.`);
        }

        const list: ArrayList<number> = new ArrayList<number>();

        for (let num = start; num < end; num += step) {
            list.add(num);
        }

        return list;
    }


    public static repeat<TValue>(value: TValue, times: number): List<TValue> {
        Assert.argument('times', times).isLength();

        const list: ArrayList<TValue> = new ArrayList<TValue>();

        for (let index = ZERO; index < times; index++) {
            list.add(value);
        }

        return list;
    }


    public static generate<TValue>(generator: (index: number) => TValue, length: number): List<TValue> {
        Assert.argument('length', length).isLength();

        const list: ArrayList<TValue> = new ArrayList<TValue>();

        for (let i = ZERO; i < length; i++) {
            list.add(generator(i));
        }

        return list;
    }
}
