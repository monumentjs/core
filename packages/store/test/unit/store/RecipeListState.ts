import { Recipe } from '../entity/Recipe';

export interface RecipeListState {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly recipes: Recipe[];
}
