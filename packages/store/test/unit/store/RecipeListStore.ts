import { Actions, Store } from '../../..';
import { LOAD, LOAD_FAIL, LOAD_SUCCESS, RecipeListActions } from './RecipeListActions';
import { RecipeListState } from './RecipeListState';
import { RecipeListEffects } from './RecipeListEffects';

export class RecipeListStore extends Store<RecipeListState, RecipeListActions> {
  constructor(actions: Actions, effects: RecipeListEffects) {
    super(actions, {
      get(): RecipeListState {
        return {
          loading: false,
          loaded: false,
          recipes: []
        };
      }
    }, effects);
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
}
