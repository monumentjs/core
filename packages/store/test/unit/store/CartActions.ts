import { Action } from '../../..';
import { PageRequest, Product } from './CartService';
import { CartException } from './CartException';

export const LOAD = 'CartStore.LOAD';
export const LOAD_SUCCESS = 'CartStore.LOAD_SUCCESS';
export const LOAD_FAIL = 'CartStore.LOAD_FAIL';

export class Load implements Action {
  readonly type = LOAD;
  readonly request: PageRequest;

  constructor(request: PageRequest) {
    this.request = request;
  }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  readonly products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  readonly exception: CartException;

  constructor(exception: CartException) {
    this.exception = exception;
  }
}
