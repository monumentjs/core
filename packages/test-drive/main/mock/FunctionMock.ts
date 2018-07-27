import {FunctionCall} from './FunctionCall';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {Countable} from '@monument/core/main/collection/readonly/Countable';


export class FunctionMock<TFunc extends Function = Function> {
    private readonly _mock: Function;
    private readonly _calls: ArrayList<FunctionCall> = new ArrayList();


    public constructor(impl?: TFunc) {
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


    public get calls(): ReadOnlyList<FunctionCall> {
        return this._calls;
    }


    public get firstCall(): FunctionCall {
        return this._calls.getAt(0);
    }


    public get lastCall(): FunctionCall {
        return this._calls.getAt(this._calls.length - 1);
    }


    public get value(): TFunc {
        return this._mock as TFunc;
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
