import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, Effect, EffectSource, Errors } from '../../..';
import { LOAD, Load, LOAD_FAIL, LoadFail, LoadSuccess } from './CartActions';
import { CartService, Product } from './CartService';
import { CartStore } from './CartStore';

export class CartEffects {
  @Effect()
  load: EffectSource = this.actions.ofType<Load>(LOAD).pipe(
    mergeMap(action => {
      return this.service.getProducts(action.payload).pipe(
        map((products: Product[]) => new LoadSuccess(products)),
        catchError((err => {
          return of([new LoadFail(err)]);
        }))
      );
    })
  );

  @Effect({ dispatch: false })
  loadFail: EffectSource = this.actions.ofType<LoadFail>(LOAD_FAIL).pipe(
    tap(action => this.errors.next(action.payload))
  );

  constructor(
    private actions: Actions,
    private errors: Errors,
    private store: CartStore,
    private service: CartService
  ) {
  }
}
