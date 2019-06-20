import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action, Actions, EffectDefMap, Store } from '../../../index';
import { Recipe } from '../entity/Recipe';
import { RecipeListClient } from '../http/RecipeListClient';

const LOAD = 'RecipeList Load';
const LOAD_SUCCESS = 'RecipeList LoadSuccess';
const LOAD_FAIL = 'RecipeList LoadFail';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public recipes: Recipe[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
}

export type RecipeListActions = LoadAction | LoadSuccessAction | LoadFailAction;

export interface RecipeListState {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly recipes: Recipe[];
}

export class RecipeListStore extends Store<RecipeListState, RecipeListActions> {
  constructor(actions: Actions, private readonly recipeListClient: RecipeListClient) {
    super(actions);
  }

  protected getInitialState() {
    return {
      loading: false,
      loaded: false,
      recipes: []
    };
  }

  protected getNextState(currentState: RecipeListState, action: RecipeListActions): RecipeListState {
    switch (action.type) {
      case LOAD:
        return {
          loading: true,
          loaded: false,
          recipes: []
        };
      case LOAD_SUCCESS:
        return {
          loading: false,
          loaded: true,
          recipes: action.recipes
        };
      case LOAD_FAIL:
        return {
          loading: false,
          loaded: false,
          recipes: []
        };
    }
  }

  protected getEffects(actions: Actions, state: Observable<RecipeListState>): EffectDefMap {
    return {
      load: () => {
        return actions.ofType<LoadAction>(LOAD).pipe(
          switchMap(() => {
            return this.recipeListClient.getRecipes();
          }),
          map((recipes: Recipe[]) => {
            return new LoadSuccessAction(recipes);
          })
        );
      }
    };
  }
}
