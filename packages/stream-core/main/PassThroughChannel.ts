import {AbstractChannel} from './AbstractChannel';


export class PassThroughChannel<T> extends AbstractChannel<T, T> {
    protected async transform(chunk: T): Promise<T> {
        return chunk;
    }
}
