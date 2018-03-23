import {Ordered} from '@monument/core/main/Ordered';
import {Precedence} from '@monument/core/main/Precedence';


export class PostProcessorConfiguration implements Ordered {
    protected readonly _order: number;

    public get order(): number {
        return this._order;
    }


    public constructor(order: number = Precedence.DEFAULT) {
        this._order = order;
    }
}
