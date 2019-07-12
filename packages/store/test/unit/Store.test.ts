import { ArrayList, List } from '@monument/core';
import { Actions, Store } from '../..';
import { RecipeListStore } from './store/RecipeListStore';
import { RecipeListClient } from './http/RecipeListClient';
import { LoadAction } from './store/RecipeListActions';
import { RecipeListState } from './store/RecipeListState';
import { RecipeListEffects } from './store/RecipeListEffects';

describe('Store', () => {
  let actions!: Actions;
  let client!: RecipeListClient;
  let store!: RecipeListStore;
  let effects!: RecipeListEffects;
  let snapshots!: List<RecipeListState>;

  beforeEach(() => {
    actions = new Actions();
    client = new RecipeListClient();
    effects = new RecipeListEffects(actions, client);
    store = new RecipeListStore(actions, effects);
    snapshots = new ArrayList();
    store.state.subscribe(snapshot => snapshots.add(snapshot));
  });

  it('should update state and call effects on each action', complete => {
    actions.subscribe({ complete });

    expect(snapshots.length).toBe(1);
    expect(snapshots.getAt(0)).toEqual({
      loading: false,
      loaded: false,
      recipes: []
    });

    actions.next(new LoadAction());

    expect(snapshots.length).toBe(3);

    expect(snapshots.getAt(1)).toEqual({
      loading: true,
      loaded: false,
      recipes: []
    });

    expect(snapshots.getAt(2)).toEqual({
      loading: false,
      loaded: true,
      recipes: [
        {
          name: 'test'
        }
      ]
    });

    actions.complete();
  });
});
