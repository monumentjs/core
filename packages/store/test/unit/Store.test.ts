import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EffectSource } from '../../src/EffectSource';
import { Action } from '../../src/Action';
import { Reaction } from '../../src/decorator/reaction/Reaction';
import { Effect } from '../../src/decorator/effect/Effect';
import { Actions, ofType } from '../../src/Actions';
import { Store } from '../../src/Store';

//region API LAYER

export interface Product {
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

export class CartService {
  addProduct(product: Product): Observable<boolean> {
    return of(true);
  }

  removeProduct(product: Product): Observable<boolean> {
    return of(true);
  }

  getProducts(): Observable<Product[]> {
    return of([
      {
        name: 'name1',
        description: 'description1',
        price: 1
      },
      {
        name: 'name2',
        description: 'description2',
        price: 2
      }
    ]);
  }
}

//endregion

//region STORE LAYER
//region ACTIONS

export const LOAD = 'CartStore.LOAD';
export const LOAD_SUCCESS = 'CartStore.LOAD_SUCCESS';
export const ADD_PRODUCT = 'CartStore.ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'CartStore.ADD_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT = 'CartStore.REMOVE_PRODUCT';
export const REMOVE_PRODUCT_SUCCESS = 'CartStore.REMOVE_PRODUCT_SUCCESS';

export class Load implements Action {
  readonly type = LOAD;
  readonly payload = undefined;
}

export class LoadSuccess implements Action<Product[]> {
  readonly type = LOAD_SUCCESS;
  readonly payload: Product[];

  constructor(payload: Product[]) {
    this.payload = payload;
  }
}

export class AddProduct implements Action<Product> {
  readonly type = ADD_PRODUCT;
  readonly payload: Product;

  constructor(payload: Product) {
    this.payload = payload;
  }
}

export class AddProductSuccess implements Action<Product> {
  readonly type = ADD_PRODUCT_SUCCESS;
  readonly payload: Product;

  constructor(payload: Product) {
    this.payload = payload;
  }
}

export class RemoveProduct implements Action<Product> {
  readonly type = REMOVE_PRODUCT;
  readonly payload: Product;

  constructor(payload: Product) {
    this.payload = payload;
  }
}

export class RemoveProductSuccess implements Action<Product> {
  readonly type = REMOVE_PRODUCT_SUCCESS;
  readonly payload: Product;

  constructor(payload: Product) {
    this.payload = payload;
  }
}

//endregion

//region SNAPSHOT

export interface CartStateSnapshot {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly products: Product[];
  readonly totalPrice: number;
  readonly isEmpty: boolean;
}

//endregion

//region STATE

export class CartState {
  loading: boolean = false;
  loaded: boolean = false;
  products: Product[] = [];

  get totalPrice(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  get isEmpty(): boolean {
    return this.products.length === 0;
  }

  @Reaction(LOAD)
  setLoading() {
    this.loading = true;
    this.loaded = false;
    this.products = [];
  }

  @Reaction(LOAD_SUCCESS)
  setLoaded(products: Product[]) {
    this.loading = false;
    this.loaded = true;
    this.products = products;
  }

  @Reaction(ADD_PRODUCT)
  addProduct(product: Product) {
    this.products.push(product);
  }

  @Reaction(REMOVE_PRODUCT)
  removeProduct(product: Product) {
    this.products.splice(this.products.indexOf(product), 1);
  }
}

//endregion

//region EFFECTS

export class CartEffects {
  @Effect()
  load: EffectSource = this.actions.pipe(
    ofType<Load>(LOAD),
    mergeMap(() => {
      return this.service.getProducts().pipe(
        map((products: Product[]) => new LoadSuccess(products))
      );
    })
  );

  @Effect()
  addProduct: EffectSource = this.actions.pipe(
    ofType<AddProduct>(ADD_PRODUCT),
    mergeMap((action: AddProduct) => {
      return this.service.addProduct(action.payload).pipe(map(() => {
        return new AddProductSuccess(action.payload);
      }));
    })
  );

  @Effect()
  removeProduct: EffectSource = this.actions.pipe(
    ofType<RemoveProduct>(REMOVE_PRODUCT),
    mergeMap((action: RemoveProduct) => {
      return this.service.removeProduct(action.payload).pipe(map(() => {
        return new RemoveProductSuccess(action.payload);
      }));
    })
  );

  constructor(private actions: Actions, private service: CartService) {
  }
}

//endregion

//region STORE

export class CartStore extends Store<CartState, CartStateSnapshot> {
  constructor(actions: Actions, state: CartState, cartEffects: CartEffects) {
    super({
      actions,
      state,
      effects: [cartEffects],
      takeSnapshot(cartState: CartState): CartStateSnapshot {
        const { loading, loaded, products, isEmpty, totalPrice } = cartState;

        return {
          loaded,
          loading,
          products: [...products],
          isEmpty,
          totalPrice
        };
      }
    });
  }
}

//endregion

//endregion

describe('Store', function() {
  let actions: Actions;
  let service: CartService;
  let state: CartState;
  let store: CartStore;
  let effects: CartEffects;

  beforeEach(() => {
    actions = new Actions();
    state = new CartState();
    service = new CartService();
    effects = new CartEffects(actions, service);
    store = new CartStore(actions, state, effects);
  });

  test('reaction is called', function(done) {
    const snapshots: CartStateSnapshot[] = [];

    store.state.subscribe({
      next: snapshot => {
        snapshots.push(snapshot);
      },
      complete: () => {
        expect(snapshots.length).toBe(3);
        expect(snapshots[0]).toEqual({
          loaded: false,
          loading: false,
          products: [],
          isEmpty: true,
          totalPrice: 0
        });
        expect(snapshots[1]).toEqual({
          loaded: false,
          loading: true,
          products: [],
          isEmpty: true,
          totalPrice: 0
        });
        expect(snapshots[2]).toEqual({
          loaded: true,
          loading: false,
          products: [
            {
              name: 'name1',
              description: 'description1',
              price: 1
            },
            {
              name: 'name2',
              description: 'description2',
              price: 2
            }
          ],
          isEmpty: false,
          totalPrice: 3
        });
        expect(state.products.length).toBe(2);
        done();
      }
    });
    actions.next(new Load());
    store.dispose();
  });
});
