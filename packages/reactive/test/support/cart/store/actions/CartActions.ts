import {Actions} from '../../../../..';
import {CartItemDto} from '../../dto/CartItemDto';
import {CartAction} from './CartAction';
import {AddProductAction} from './AddProductAction';
import {CartItem} from '../state/CartItem';
import {UpdateQuantityAction} from './UpdateQuantityAction';

export class CartActions extends Actions<CartAction> {
    public addProduct(item: CartItemDto): void {
        this.next(new AddProductAction(new CartItem(item)));
    }

    public updateQuantity(itemId: number, quantity: number): void {
        this.next(new UpdateQuantityAction(itemId, quantity));
    }
}
