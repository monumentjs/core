import {Observable, Observer} from '@monument/reactive';
import {HttpServerActionTypes} from './HttpServerActionTypes';
import {HttpServer} from '../HttpServer';
import {HttpRequest} from '../HttpRequest';
import {HttpResponse} from '../HttpResponse';
import {HttpServerRequestAction} from './HttpServerRequestAction';
import {HttpServerErrorAction} from './HttpServerErrorAction';
import {HttpServerCloseAction} from './HttpServerCloseAction';

export class HttpServerActions extends Observable<HttpServerActionTypes> {

    public constructor(server: HttpServer) {
        super((observer: Observer<HttpServerActionTypes>) => {
            return server.subscribe({
                next([request, response]: [HttpRequest, HttpResponse]) {
                    observer.next(new HttpServerRequestAction(request, response));
                },
                error(ex: Error): void {
                    observer.next(new HttpServerErrorAction(ex));
                },
                complete(): void {
                    observer.next(new HttpServerCloseAction());
                    observer.complete();
                }
            });
        });
    }
}
