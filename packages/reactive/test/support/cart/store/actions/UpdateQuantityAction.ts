import {Action} from '../../../../..';
import {CartActionType} from './CartActionType';

export class UpdateQuantityAction implements Action {
    public readonly type = CartActionType.UPDATE_QUANTITY;
    public readonly itemId: number;
    public readonly quantity: number;

    public constructor(itemId: number, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
    }
}
