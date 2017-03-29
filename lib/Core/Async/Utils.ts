import {AsyncResult} from '../types';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export async function wait(timeInMilliseconds: number): AsyncResult<void> {
    assertArgumentNotNull('timeInMilliseconds', timeInMilliseconds);

    return new Promise<void>((resolve: () => void): void => {
        setTimeout(resolve, timeInMilliseconds);
    });
}
