import {InvalidArgumentException} from '../exceptions/InvalidArgumentException';
import {Assert} from '../assert/Assert';
import {LinkedList} from './mutable/LinkedList';
import {List} from './mutable/List';
import {ZERO} from '../Constants';


export class ListGenerator {
    public static range(start: number, end: number, step: number = 1): List<number> {
        Assert.range(start, end).bounds();

        if (step === ZERO) {
            throw new InvalidArgumentException('step', `Step cannot be equal to zero.`);
        }

        const list: LinkedList<number> = new LinkedList<number>();

        for (let num = start; num < end; num += step) {
            list.add(num);
        }

        return list;
    }


    public static repeat<TValue>(generator: (index: number) => TValue, times: number): List<TValue> {
        Assert.argument('times', times).isLength();

        const list: LinkedList<TValue> = new LinkedList<TValue>();

        for (let index = ZERO; index < times; index++) {
            list.add(generator(index));
        }

        return list;
    }


    public static generate<TValue>(generator: (index: number) => TValue, length: number): List<TValue> {
        Assert.argument('length', length).isLength();

        const list: LinkedList<TValue> = new LinkedList<TValue>();

        for (let i = ZERO; i < length; i++) {
            list.add(generator(i));
        }

        return list;
    }
}
