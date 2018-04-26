import {Countable} from '@monument/collections/main/Countable';
import {ReadOnlyList} from '@monument/collections/main/ReadOnlyList';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {FunctionCall} from './FunctionCall';


export class FunctionMock<T extends Function = Function> {
    private readonly _mock: Function;
    private readonly _calls: ArrayList<FunctionCall> = new ArrayList();

    public get calls(): ReadOnlyList<FunctionCall> {
        return this._calls;
    }


    public get firstCall(): FunctionCall {
        return this._calls.getAt(0);
    }


    public get lastCall(): FunctionCall {
        return this._calls.getAt(this._calls.length - 1);
    }


    public get callsCount(): number {
        return this._calls.length;
    }


    public get value(): T {
        return this._mock as T;
    }


    public constructor(impl?: Function) {
        const self = this;

        this._mock = function (...args: any[]) {
            let returnValue: any;

            if (impl != null) {
                returnValue = impl.apply(this, args);
            }

            self._calls.add(new FunctionCall(args, returnValue));

            return returnValue;
        };
    }


    public testCallArguments(index: number, args: Iterable<any> & Countable): boolean {
        return this._calls.getAt(index).testArguments(args);
    }


    public haveBeenCalledWith(args: Iterable<any> & Countable): boolean {
        for (const call of this._calls) {
            if (call.testArguments(args)) {
                return true;
            }
        }

        return false;
    }
}
