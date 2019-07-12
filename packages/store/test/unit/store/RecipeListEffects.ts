import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect } from '../../..';
import { LOAD, LoadAction, LoadSuccessAction } from './RecipeListActions';
import { Recipe } from '../entity/Recipe';
import { RecipeListClient } from '../http/RecipeListClient';

export class RecipeListEffects {

  @Effect()
  load = this.actions.ofType<LoadAction>(LOAD).pipe(
    switchMap(() => this.client.getRecipes()),
    map((recipes: Recipe[]) => new LoadSuccessAction(recipes))
  );

  constructor(private actions: Actions, private client: RecipeListClient) {
  }

}
