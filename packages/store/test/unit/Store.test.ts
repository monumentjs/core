import { Action, Store } from '../..';

interface Recipe {
    name: string;
    details: string;
}

enum RecipeActionType {
    LOAD = 'LOAD',
    LOADED = 'LOADED',
    OPEN = 'OPEN'
}

class LoadAction implements Action {
    public readonly type = RecipeActionType.LOAD;
}

class LoadedAction implements Action {
    public readonly type = RecipeActionType.LOADED;
    public readonly recipes: Recipe[];

    public constructor(recipes: Recipe[]) {
        this.recipes = recipes;
    }
}

class OpenAction implements Action {
    public readonly type = RecipeActionType.OPEN;
    public readonly recipe: Recipe;

    public constructor(recipe: Recipe) {
        this.recipe = recipe;
    }
}

type RecipeAction = LoadAction | LoadedAction | OpenAction;

interface RecipeState {
    loading: boolean;
    open: Recipe | undefined;
    recipes: Recipe[];
}

class RecipesStore extends Store<RecipeState, RecipeAction> {
    public constructor() {
        super(
            {
                loading: false,
                open: undefined,
                recipes: []
            },
            (state: RecipeState, action: RecipeAction) => {
                switch (action.type) {
                    case RecipeActionType.LOAD:
                        return {
                            loading: true,
                            open: undefined,
                            recipes: []
                        };
                    case RecipeActionType.LOADED:
                        return {
                            loading: false,
                            open: undefined,
                            recipes: action.recipes
                        };
                    case RecipeActionType.OPEN:
                        return {
                            ...state,
                            open: action.recipe
                        };
                    default:
                        return state;
                }
            },
            (action: RecipeAction) => {
                switch (action.type) {
                    case RecipeActionType.LOAD:
                        return [
                            new LoadedAction([
                                {
                                    name: 'test',
                                    details: 'test'
                                }
                            ])
                        ];
                }
            }
        );
    }
}

describe('Store', () => {
    let store!: RecipesStore;

    beforeEach(() => {
        store = new RecipesStore();
    });

    describe('dispatch', () => {
        it('should update state and call effects', () => {
            const onNext = jest.fn();

            spyOn(store, 'dispatch').and.callThrough();

            store.subscribe(onNext);

            expect(store.dispatch).toHaveBeenCalledTimes(0);
            expect(onNext).toHaveBeenCalledTimes(1);
            expect(onNext).toHaveBeenLastCalledWith({
                loading: false,
                open: undefined,
                recipes: []
            });

            store.dispatch(new LoadAction());

            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(store.dispatch).toHaveBeenLastCalledWith(
                new LoadedAction([
                    {
                        name: 'test',
                        details: 'test'
                    }
                ])
            );
            expect(onNext).toHaveBeenCalledTimes(3);
            expect(onNext).toHaveBeenNthCalledWith(2, {
                loading: true,
                open: undefined,
                recipes: []
            });
            expect(onNext).toHaveBeenLastCalledWith({
                loading: false,
                open: undefined,
                recipes: [
                    {
                        name: 'test',
                        details: 'test'
                    }
                ]
            });
        });
    });
});
