import { Reaction, State } from '../../..';
import { Product } from './CartService';
import { LOAD, LOAD_FAIL, LOAD_SUCCESS, LoadFail, LoadSuccess } from './CartActions';

export interface CartStateSnapshot {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly products: ReadonlyArray<Product>;
  readonly totalPrice: number;
  readonly isEmpty: boolean;
  readonly error: Error | undefined;
}

export class CartState implements State<CartStateSnapshot> {
  private _loading: boolean = false;
  private _loaded: boolean = false;
  private _products: Product[] = [];
  private _error: Error | undefined;

  get products(): ReadonlyArray<Product> {
    return this._products;
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get loading(): boolean {
    return this._loading;
  }

  get totalPrice(): number {
    return this._products.reduce((total, product) => total + product.price, 0);
  }

  get isEmpty(): boolean {
    return this._products.length === 0;
  }

  get error(): Error | undefined {
    return this._error;
  }

  @Reaction(LOAD)
  load() {
    this._loading = true;
    this._loaded = false;
    this._error = undefined;
    this._products = [];
  }

  @Reaction(LOAD_SUCCESS)
  loadSuccess(action: LoadSuccess) {
    this._loading = false;
    this._loaded = true;
    this._products = action.products;
  }

  @Reaction(LOAD_FAIL)
  loadFail(action: LoadFail) {
    this._loading = false;
    this._loaded = true;
    this._error = action.exception;
  }

  getSnapshot(): CartStateSnapshot {
    const { loading, loaded, products, isEmpty, totalPrice, error } = this;

    return {
      loaded,
      loading,
      products: [...products],
      isEmpty,
      totalPrice,
      error
    };
  }
}
