import Event, {IEvent} from './Event';
import {Pool} from './types';


interface IEventListener {
    once: boolean;
    context: Object;
    handler: IEventHandler;
}


export interface IEventHandler {
    (event: IEvent, ...args: any[]): any;
}


export default class EventEmitter {
    private _events: Pool<IEventListener[]>;


    get types(): string[] {
        return Object.keys(this._events);
    }


    constructor() {
        this._events = Object.create(null);
    }


    public on(type: string, handler: IEventHandler, context: Object = this): EventEmitter {
        this.checkEventSlot(type);
        this._events[type].push({handler, context, once: false});
        return this;
    }


    public once(type: string, handler: IEventHandler, context: Object = this): EventEmitter {
        this.checkEventSlot(type);
        this._events[type].push({handler, context, once: true});
        return this;
    }


    public emit(event: IEvent, ...args: any[]) {
        let handlers: IEventListener[] = this._events[event.type];

        if (!Array.isArray(handlers)) {
            return;
        }

        for (let item of handlers) {
            let { handler, context, once } = item;

            handler.call(context, event, ...args);

            if (once) {
                this.off(event.type, handler);
            }
        }
    }


    public off(type: string, handler?: IEventHandler) {
        if (handler) {
            let handlers = this._events[type];

            if (!Array.isArray(handlers)) {
                return;
            }

            handlers = handlers.filter(function (item) {
                return item.handler !== handler;
            });

            this._events[type] = handlers;
        } else {
            delete this._events[type];
        }
    }


    public removeAllListeners(type?: string) {
        if (type) {
            this.off(type);
        } else {
            this.types.forEach((t: string) => {
                this.off(t);
            });
        }
    }

    /**
     * Creates and emits events of specified type.
     * Usually it overridden in sub-classes to unify process of events emitting.
     * @param type Event type.
     */
    protected notify(type: string) {
        this.emit(new Event(type));
    }


    private checkEventSlot(type: string) {
        this._events[type] = this._events[type] || [];
    }
}