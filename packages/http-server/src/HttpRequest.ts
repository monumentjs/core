import { Observable, Observer } from '@monument/reactive';
import { IncomingMessage } from 'http';

export class HttpRequest extends Observable<Buffer | string> {
    private readonly _incomingMessage: IncomingMessage;

    public constructor(incomingMessage: IncomingMessage) {
        super((observer: Observer<Buffer | string>) => {
            (async () => {
                for await (const chunk of incomingMessage) {
                    observer.next(chunk);
                }

                observer.complete();
            })();
        });

        this._incomingMessage = incomingMessage;
    }
}
