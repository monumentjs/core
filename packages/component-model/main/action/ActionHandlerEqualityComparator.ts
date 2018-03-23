import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {GetInstance} from '@monument/language/main/decorator/GetInstance';
import {ActionHandler} from './ActionHandler';


export class ActionHandlerEqualityComparator implements EqualityComparator<ActionHandler<object>> {
    @GetInstance()
    public static readonly instance: ActionHandlerEqualityComparator;


    private constructor() {
    }


    public equals<T extends object>(x: ActionHandler<T>, y: ActionHandler<T>): boolean {
        return x.type === y.type && x.callback === y.callback;
    }
}
