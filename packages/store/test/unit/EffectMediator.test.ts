import { from, of } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { Action, Actions, Effect, EffectMediator, EffectSource } from '../..';

const EMPTY = 'EMPTY';
const LOAD = 'LOAD';
const LOAD_ASYNC = 'LOAD_ASYNC';
const LOAD_STREAM = 'LOAD_STREAM';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const SHOW_ERROR_POPUP = 'SHOW_ERROR_POPUP';

class EmptyAction implements Action {
  readonly type = EMPTY;
}

class LoadAction implements Action {
  readonly type = LOAD;
  readonly payload: boolean;

  constructor(payload: boolean) {
    this.payload = payload;
  }
}

class LoadAsyncAction implements Action {
  readonly type = LOAD_ASYNC;
  readonly payload: boolean;

  constructor(payload: boolean) {
    this.payload = payload;
  }
}

class LoadStreamAction implements Action {
  readonly type = LOAD_STREAM;
  readonly payload: boolean;

  constructor(payload: boolean) {
    this.payload = payload;
  }
}

class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  readonly payload: string[];

  constructor(payload: string[]) {
    this.payload = payload;
  }
}

class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
  readonly payload: Error;

  constructor(payload: Error) {
    this.payload = payload;
  }
}

class ShowErrorPopupAction implements Action {
  readonly type = SHOW_ERROR_POPUP;
  readonly payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }
}

class DataEffects {
  @Effect()
  readonly empty: EffectSource = this.actions.ofType<EmptyAction>(EMPTY).pipe(
    mapTo(undefined)
  );

  @Effect()
  readonly load: EffectSource = this.actions.ofType<LoadAction>(LOAD).pipe(
    map(action => {
      if (action.payload) {
        return new LoadSuccessAction(['success']);
      } else {
        return [
          new LoadFailAction(new Error('Oops')),
          new ShowErrorPopupAction('Oops')
        ];
      }
    })
  );

  @Effect()
  readonly loadAsync: EffectSource = this.actions.ofType<LoadAsyncAction>(LOAD_ASYNC).pipe(
    map(async action => {
      if (action.payload) {
        return new LoadSuccessAction(['success']);
      } else {
        return [
          new LoadFailAction(new Error('Oops')),
          new ShowErrorPopupAction('Oops')
        ];
      }
    })
  );

  @Effect()
  readonly loadStream: EffectSource = this.actions.ofType<LoadStreamAction>(LOAD_STREAM).pipe(
    map(action => {
      if (action.payload) {
        return of(new LoadSuccessAction(['success']));
      } else {
        return from([
          new LoadFailAction(new Error('Oops')),
          new ShowErrorPopupAction('Oops')
        ]);
      }
    })
  );

  constructor(private readonly actions: Actions) {
  }
}

class PopupEffects {
  readonly errors: string[] = [];

  @Effect({ dispatch: false })
  readonly showError: EffectSource = this.actions.ofType<ShowErrorPopupAction>(SHOW_ERROR_POPUP).pipe(
    tap(action => this.errors.push(action.payload))
  );

  constructor(private readonly actions: Actions) {
  }
}

describe('EffectMediator', function() {
  let history: Action[];
  let actions: Actions;
  let dataEffects: DataEffects;
  let popupEffects: PopupEffects;
  let effectMediator: EffectMediator;

  beforeEach(() => {
    history = [];
    actions = new Actions();

    actions.subscribe(action => {
      history.push(action);
    });

    dataEffects = new DataEffects(actions);
    popupEffects = new PopupEffects(actions);
    effectMediator = new EffectMediator(actions, [dataEffects, popupEffects]);
  });

  afterEach(() => {
    effectMediator.dispose();
  });

  it('should dispatch 1-to-1 actions through effects', function() {
    actions.next(new LoadAction(true));

    expect(history.length).toBe(2);
    expect(history).toEqual([
      new LoadAction(true),
      new LoadSuccessAction(['success'])
    ]);
  });

  it('should dispatch 1-to-many actions through effects', function() {
    actions.next(new LoadAction(false));

    expect(history.length).toBe(3);
    expect(history).toEqual([
      new LoadAction(false),
      new LoadFailAction(new Error('Oops')),
      new ShowErrorPopupAction('Oops')
    ]);
  });

  it('should dispatch 1-to-1 async actions through effects', function(done) {
    actions.ofType(LOAD_SUCCESS).subscribe(() => {
      expect(history.length).toBe(2);
      expect(history).toEqual([
        new LoadAsyncAction(true),
        new LoadSuccessAction(['success'])
      ]);
      done();
    });

    actions.next(new LoadAsyncAction(true));
  });

  it('should dispatch 1-to-many async actions through effects', function(done) {
    actions.ofType(SHOW_ERROR_POPUP).subscribe(() => {
      expect(history.length).toBe(3);
      expect(history).toEqual([
        new LoadAsyncAction(false),
        new LoadFailAction(new Error('Oops')),
        new ShowErrorPopupAction('Oops')
      ]);
      done();
    });

    actions.next(new LoadAsyncAction(false));
  });

  it('should dispatch 1-to-1 stream actions through effects', function(done) {
    actions.ofType(LOAD_SUCCESS).subscribe(() => {
      expect(history.length).toBe(2);
      expect(history).toEqual([
        new LoadStreamAction(true),
        new LoadSuccessAction(['success'])
      ]);
      done();
    });

    actions.next(new LoadStreamAction(true));
  });

  it('should dispatch 1-to-many stream actions through effects', function(done) {
    actions.ofType(SHOW_ERROR_POPUP).subscribe(() => {
      expect(history.length).toBe(3);
      expect(history).toEqual([
        new LoadStreamAction(false),
        new LoadFailAction(new Error('Oops')),
        new ShowErrorPopupAction('Oops')
      ]);
      done();
    });

    actions.next(new LoadStreamAction(false));
  });

  it('should cancel on empty effect result', function() {
    actions.next(new EmptyAction());

    expect(history.length).toBe(1);
    expect(history).toEqual([
      new EmptyAction()
    ]);
  });
});
