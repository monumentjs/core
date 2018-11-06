import {ToString} from '@monument/core';


/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export interface QueryParametersObject {
    readonly [name: string]: ToString | undefined | null;
}
