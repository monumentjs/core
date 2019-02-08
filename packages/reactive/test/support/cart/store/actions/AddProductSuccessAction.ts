import { Action } from '../../../../..';
import { CartActionType } from './CartActionType';
import { CartItem } from '../state/CartItem';

export class AddProductSuccessAction implements Action {
    public readonly type = CartActionType.ADD_PRODUCT_SUCCESS;
    public readonly item: CartItem;

    public constructor(item: CartItem) {
        this.item = item;
    }
}
