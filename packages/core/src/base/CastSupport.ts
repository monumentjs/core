import { Type } from './Type';

export interface CastSupport<T> {
    /**
     * Casts current object to instance of specified type.
     * @throws CastException if cast to specified type is not supported.
     */
    castTo(type: Type<T>): T;
}
