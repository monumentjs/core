import {Assert} from '../../Assertion/Assert';
import {List} from '../../Collections/List';
import {IList} from '../../Collections/Abstraction/IList';
import {Exception} from '../../Exceptions/Exception';


export class ListGenerator {
    public static range(start: number, end: number, step: number = 1): IList<number> {
        Assert.range(start, end).bounds();

        if (step === 0) {
            throw new Exception(`Invalid argument "step": step cannot be equal to zero.`);
        }

        const list: List<number> = new List<number>();

        for (let num = start; num < end; num += step) {
            list.add(num);
        }

        return list;
    }


    public static repeat<TValue>(value: TValue, times: number): IList<TValue> {
        Assert.argument('times', times).isLength();

        const list: List<TValue> = new List<TValue>();

        for (let index = 0; index < times; index++) {
            list.add(value);
        }

        return list;
    }


    public static generate<TValue>(generator: (index: number) => TValue, length: number): IList<TValue> {
        Assert.argument('length', length).isLength();

        const list: List<TValue> = new List<TValue>();

        for (let i = 0; i < length; i++) {
            list.add(generator(i));
        }

        return list;
    }
}
