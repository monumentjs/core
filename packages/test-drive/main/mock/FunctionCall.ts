import {Countable} from '@monument/core/main/collection/Countable';


export class FunctionCall {
    private readonly _arguments: any[];
    private readonly _returnValue: any;

    public get returnValue(): any {
        return this._returnValue;
    }


    public get arguments(): Iterable<any> & Countable {
        return this._arguments;
    }


    public constructor(args: any[], returnValue: any) {
        this._arguments = args;
        this._returnValue = returnValue;
    }


    public getArgument(index: number): any | undefined {
        return this._arguments[index];
    }


    public testArguments(args: Iterable<any> & Countable): boolean {
        if (this._arguments.length !== args.length) {
            return false;
        }

        let argIndex: number = 0;

        for (const value of args) {
            if (value !== this._arguments[argIndex]) {
                return false;
            }

            argIndex++;
        }

        return true;
    }
}
