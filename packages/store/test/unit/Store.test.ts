import { Actions, EffectMediator, ErrorMediator, Errors, Store } from '../..';
import { CartService } from './store/CartService';
import { Load } from './store/CartActions';
import { CartState, CartStateSnapshot } from './store/CartState';
import { CartStore } from './store/CartStore';
import { CartEffects } from './store/CartEffects';
import { CartErrors } from './store/CartErrors';
import { CartException } from './store/CartException';

describe('Store', function() {
  let actions: Actions;
  let errors: Errors;
  let cartService: CartService;
  let cartState: CartState;
  let cartStore: CartStore;
  let cartEffects: CartEffects;
  let cartErrors: CartErrors;
  let effectMediator: EffectMediator;
  let errorMediator: ErrorMediator;

  beforeEach(() => {
    actions = new Actions();
    errors = new Errors();
    cartState = new CartState();
    cartService = new CartService();
    cartErrors = new CartErrors();
    cartStore = new CartStore(actions, cartState);
    cartEffects = new CartEffects(actions, errors, cartStore, cartService);
    effectMediator = new EffectMediator(actions, [cartEffects]);
    errorMediator = new ErrorMediator(errors, [cartErrors]);
  });

  afterEach(() => {
    effectMediator.dispose();
  });

  it('should have proper state snapshot after creation', () => {
    expect(cartStore.snapshot).toEqual({
      loaded: false,
      loading: false,
      products: [],
      isEmpty: true,
      totalPrice: 0
    });
  });

  it('should call corresponding reaction methods', function(done) {
    const snapshots: CartStateSnapshot[] = [];

    const loadSpy = spyOn(cartState, 'load').and.callThrough();
    const loadSuccessSpy = spyOn(cartState, 'loadSuccess').and.callThrough();

    cartStore.stream.subscribe({
      next: snapshot => {
        snapshots.push(snapshot);
      },
      complete: () => {
        expect(loadSpy).toHaveBeenNthCalledWith(1, {
          page: 0
        });
        expect(loadSuccessSpy).toHaveBeenNthCalledWith(1, [
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
        done();
      }
    });
    actions.next(new Load({
      page: 0
    }));
    cartStore.dispose();
  });

  it('should handle error', function(done) {
    const snapshots: CartStateSnapshot[] = [];

    const loadSpy = spyOn(cartState, 'load').and.callThrough();
    const loadFailSpy = spyOn(cartState, 'loadFail').and.callThrough();

    cartStore.stream.subscribe({
      next: snapshot => {
        snapshots.push(snapshot);
      },
      complete: () => {
        expect(loadSpy).toHaveBeenNthCalledWith(1, {
          page: -1
        });
        expect(loadFailSpy).toHaveBeenNthCalledWith(1, new CartException('Invalid page number'));
        expect(snapshots).toEqual([
          {
            loaded: false,
            loading: false,
            products: [],
            isEmpty: true,
            totalPrice: 0
          },
          {
            loaded: false,
            loading: true,
            products: [],
            isEmpty: true,
            totalPrice: 0
          },
          {
            loaded: true,
            loading: false,
            products: [],
            isEmpty: true,
            totalPrice: 0,
            error: new CartException('Invalid page number')
          }
        ]);
        expect(cartErrors.errors).toEqual([
          new CartException('Invalid page number')
        ]);
        done();
      }
    });

    actions.next(new Load({
      page: -1
    }));

    cartStore.dispose();
  });
});
