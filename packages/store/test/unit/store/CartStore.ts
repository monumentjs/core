import { Actions, Store } from '../../..';
import { CartState, CartStateSnapshot } from './CartState';

export class CartStore extends Store<CartStateSnapshot, CartState> {
  constructor(actions: Actions, state: CartState) {
    super(actions, state);
  }
}
