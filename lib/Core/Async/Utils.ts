import {AsyncResult} from '../types';


export async function wait(timeInMilliseconds: number): AsyncResult<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, timeInMilliseconds);
    });
}
