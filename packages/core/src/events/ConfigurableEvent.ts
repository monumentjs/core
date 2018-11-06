import {Disposable} from '../base/Disposable';
import {EventHandler} from './EventHandler';
import {Event} from './Event';
import {EventArgs} from './EventArgs';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ConfigurableEvent<TArgs extends EventArgs> implements Event<TArgs>, Disposable {
    private readonly _handlers: Array<EventHandler<TArgs>> = [];

    public dispose(): void {
        this._handlers.length = 0;
    }

    public subscribe(handler: EventHandler<TArgs>): boolean {
        if (this._handlers.includes(handler)) {
            return false;
        }

        this._handlers.push(handler);

        return true;
    }

    public trigger(args: TArgs): void {
        for (const handler of this._handlers) {
            handler(args);
        }
    }

    public unsubscribe(handler: EventHandler<TArgs>): boolean {
        if (!this._handlers.includes(handler)) {
            return false;
        }

        this._handlers.splice(this._handlers.indexOf(handler), 1);

        return true;
    }
}
