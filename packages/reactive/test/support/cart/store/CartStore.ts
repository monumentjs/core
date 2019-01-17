import {Actions, Effect, Store} from '../../../..';
import {CartState} from './state/CartState';
import {CartAction} from './actions/CartAction';
import {CartActionType} from './actions/CartActionType';

export class CartStore extends Store<CartState, CartAction> {
    public constructor(actions: Actions<CartAction>, effects: Effect<CartAction>) {
        super(new CartState(), actions, effects);
    }

    protected reduce(action: CartAction): CartState {
        const state = this.value;

        switch (action.type) {
            case CartActionType.ADD_PRODUCT:
                return state.addProduct(action.item);

            case CartActionType.UPDATE_QUANTITY: {
                return state.updateQuantity(action.itemId, action.quantity);
            }
        }

        return state;
    }
}
