import {GetInstance} from '../Language/Decorators/GetInstance';
import {IEqualityComparator} from './Abstraction/IEqualityComparator';


export class NullSafeComparator implements IEqualityComparator<any> {
    @GetInstance()
    public static readonly instance: NullSafeComparator;


    private constructor() {}

    /**
     * Determine if the given objects are equal, returning {@code true} if
     * both are {@code null} or {@code false} if only one is {@code null}.
     */
    public equals(o1: any, o2: any): boolean {
        if (o1 == null) {
            o1 = undefined;
        }

        if (o2 == null) {
            o2 = undefined;
        }

        if (o1 === o2) {
            return true;
        }

        if (o1 == null || o2 == null) {
            return false;
        }

        return o1 === o2;
    }
}
