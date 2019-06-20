import { Observable, of } from 'rxjs';
import { Recipe } from '../entity/Recipe';

export class RecipeListClient {
  getRecipes(): Observable<Recipe[]> {
    return of([
      {
        name: 'test'
      }
    ]);
  }
}
