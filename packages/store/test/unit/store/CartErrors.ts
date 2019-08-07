import { Catch } from '../../..';
import { CartException } from './CartException';

export class CartErrors {
  errors: CartException[] = [];

  @Catch(CartException)
  onCartException(ex: CartException) {
    this.errors.push(ex);
  }
}
