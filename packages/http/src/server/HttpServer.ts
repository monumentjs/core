import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMapTo, tap } from 'rxjs/operators';
import { Action, Actions, EffectDefMap, Store } from '@monument/store';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { HttpServerAddress } from './HttpServerAddress';
import { Http1RequestAdapter } from './Http1RequestAdapter';
import { Http1ResponseAdapter } from './Http1ResponseAdapter';
import ErrnoException = NodeJS.ErrnoException;

export const HTTP_SERVER_START = '@monument.http.HTTP_SERVER_START';
export const HTTP_SERVER_STARTED = '@monument.http.HTTP_SERVER_STARTED';
export const HTTP_SERVER_START_FAILED = '@monument.http.HTTP_SERVER_START_FAILED';
export const HTTP_SERVER_STOP = '@monument.http.HTTP_SERVER_STOP';
export const HTTP_SERVER_STOPPED = '@monument.http.HTTP_SERVER_STOPPED';
export const HTTP_SERVER_REQUEST = '@monument.http.HTTP_SERVER_REQUEST';

export class HttpServerRequestAction implements Action {
  readonly type = HTTP_SERVER_REQUEST;

  constructor(readonly request: HttpRequest, readonly response: HttpResponse) {}
}

export class HttpServerStartAction implements Action {
  readonly type = HTTP_SERVER_START;

  constructor(readonly address: HttpServerAddress) {}
}

export class HttpServerStartedAction implements Action {
  readonly type = HTTP_SERVER_STARTED;

  constructor(readonly server: Server) {}
}

export class HttpServerStartFailedAction implements Action {
  readonly type = HTTP_SERVER_START_FAILED;

  constructor(readonly error: ErrnoException) {}
}

export class HttpServerStopAction implements Action {
  readonly type = HTTP_SERVER_STOP;
}

export class HttpServerStoppedAction implements Action {
  readonly type = HTTP_SERVER_STOPPED;
}

export type HttpServerActions =
  | HttpServerRequestAction
  | HttpServerStartAction
  | HttpServerStartedAction
  | HttpServerStartFailedAction
  | HttpServerStopAction
  | HttpServerStoppedAction;

export interface HttpServerState {
  readonly running: boolean;
  readonly starting: boolean;
  readonly stopping: boolean;
  readonly server?: Server;
}

export class HttpServer extends Store<HttpServerState, HttpServerActions> {
  protected getInitialState(): HttpServerState {
    return {
      running: false,
      starting: false,
      stopping: false
    };
  }

  protected getNextState(currentState: HttpServerState, action: HttpServerActions): HttpServerState {
    switch (action.type) {
      case HTTP_SERVER_START:
        return {
          running: false,
          starting: true,
          stopping: false
        };
      case HTTP_SERVER_STARTED:
        return {
          running: true,
          starting: false,
          stopping: false,
          server: action.server
        };
      case HTTP_SERVER_START_FAILED:
        return {
          running: false,
          starting: false,
          stopping: false
        };
      case HTTP_SERVER_STOP:
        return {
          running: false,
          starting: false,
          stopping: true
        };
      case HTTP_SERVER_STOPPED:
        return {
          running: false,
          starting: false,
          stopping: false
        };
    }

    return currentState;
  }

  protected getEffects(actions: Actions, state: Observable<HttpServerState>): EffectDefMap {
    return {
      start: () => {
        return combineLatest([actions.ofType<HttpServerStartAction>(HTTP_SERVER_START), state]).pipe(
          tap(([, snapshot]: [HttpServerStartAction, HttpServerState]) => {
            if (snapshot.running && snapshot.starting && snapshot.stopping) {
              console.warn('');
            }
          }),
          filter(([, snapshot]: [HttpServerStartAction, HttpServerState]) => {
            return !snapshot.running && !snapshot.starting && !snapshot.stopping;
          }),
          map(
            ([action]: [HttpServerStartAction, HttpServerState]): Promise<HttpServerActions> => {
              return new Promise(resolve => {
                const server: Server = createServer((request: IncomingMessage, response: ServerResponse) => {
                  actions.next(new HttpServerRequestAction(new Http1RequestAdapter(request), new Http1ResponseAdapter(response)));
                });

                server.once('listening', () => resolve(new HttpServerStartedAction(server)));
                server.once('error', err => resolve(new HttpServerStartFailedAction(err)));
                server.listen(action.address.port, action.address.host);
              });
            }
          )
        );
      },
      stop: () => {
        return actions.ofType<HttpServerStopAction>(HTTP_SERVER_STOP).pipe(
          switchMapTo(state),
          map(
            (snapshot: HttpServerState): Promise<HttpServerActions> => {
              return new Promise(resolve => {
                if (snapshot.server) {
                  snapshot.server.once('close', () => resolve(new HttpServerStoppedAction()));
                  snapshot.server.close();
                }

                resolve();
              });
            }
          )
        );
      }
    };
  }
}
