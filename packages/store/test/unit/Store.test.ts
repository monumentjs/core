import { ArrayList, List } from '@monument/core';
import { Actions, Store } from '../..';
import { LoadAction, RecipeListState, RecipeListStore } from './store/RecipeListStore';
import { RecipeListClient } from './http/RecipeListClient';

describe('Store', () => {
  let actions!: Actions;
  let client!: RecipeListClient;
  let store!: RecipeListStore;
  let snapshots!: List<RecipeListState>;

  beforeEach(() => {
    actions = new Actions();
    client = new RecipeListClient();
    store = new RecipeListStore(actions, client);
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
