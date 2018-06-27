import {DeferredObject} from '@monument/core/main/async/DeferredObject';


export class ReadRequest<T> extends DeferredObject<T> {
    public readonly size: number | undefined;


    public constructor(size?: number) {
        super();

        this.size = size;
    }
}
