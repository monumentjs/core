import { Action } from '../../../src/Action';
import { PageRequest, Product } from './CartService';
import { CartException } from './CartException';

export const LOAD = 'CartStore.LOAD';
export const LOAD_SUCCESS = 'CartStore.LOAD_SUCCESS';
export const LOAD_FAIL = 'CartStore.LOAD_FAIL';

export class Load implements Action<PageRequest> {
  readonly type = LOAD;
  readonly payload: PageRequest;

  constructor(payload: PageRequest) {
    this.payload = payload;
  }
}

export class LoadSuccess implements Action<Product[]> {
  readonly type = LOAD_SUCCESS;
  readonly payload: Product[];

  constructor(payload: Product[]) {
    this.payload = payload;
  }
}

export class LoadFail implements Action<CartException> {
  readonly type = LOAD_FAIL;
  readonly payload: CartException;

  constructor(payload: CartException) {
    this.payload = payload;
  }
}
