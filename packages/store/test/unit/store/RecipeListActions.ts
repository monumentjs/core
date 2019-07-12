import { Action } from '../../..';
import { Recipe } from '../entity/Recipe';

export const LOAD = 'RecipeList Load';
export const LOAD_SUCCESS = 'RecipeList LoadSuccess';
export const LOAD_FAIL = 'RecipeList LoadFail';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public recipes: Recipe[]) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
}

export type RecipeListActions = LoadAction | LoadSuccessAction | LoadFailAction;
