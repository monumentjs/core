import {EqualityComparator} from './EqualityComparator';
import {Equatable} from './Equatable';
import {ObjectUtils} from './utils/ObjectUtils';
import {GetInstance} from './decorators/GetInstance';


export class NullSafeEqualityComparator implements EqualityComparator<Equatable<any> | null | undefined> {
    @GetInstance()
    public static readonly instance: NullSafeEqualityComparator;


    private constructor() {}

    /**
     * Determine if the given objects are equal, returning {@code true} if
     * both are {@code null} or {@code false} if only one is {@code null}.
     */
    public equals(
        x: any,
        y: any
    ): boolean {
        if (x == null) {
            x = undefined;
        }

        if (y == null) {
            y = undefined;
        }

        if (x && y && ObjectUtils.isEquatable(x) && ObjectUtils.isEquatable(y)) {
            return x.equals(y);
        }

        return x === y;
    }
}
