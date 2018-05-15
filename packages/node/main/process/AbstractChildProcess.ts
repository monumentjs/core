import {Server, Socket} from 'net';
import {ChildProcess as NodeChildProcess} from 'child_process';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ChildProcess} from './ChildProcess';
import {ProcessMessage} from './ProcessMessage';
import {ExitCode} from './ExitCode';
import Signals = NodeJS.Signals;


export abstract class AbstractChildProcess implements ChildProcess {
    private readonly _process: NodeChildProcess;
    private readonly _messageReceived: ConfigurableEvent<this, ProcessMessageReceivedEventArgs> = new ConfigurableEvent(this);
    private readonly _disconnected: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent(this);
    private readonly _exited: ConfigurableEvent<this, ProcessExitedEventArgs> = new ConfigurableEvent(this);
    private readonly _closed: ConfigurableEvent<this, ProcessClosedEventArgs> = new ConfigurableEvent(this);


    public get messageReceived(): Event<this, ProcessMessageReceivedEventArgs> {
        return this._messageReceived;
    }


    public get exited(): Event<this, ProcessExitedEventArgs> {
        return this._exited;
    }


    public get closed(): Event<this, ProcessClosedEventArgs> {
        return this._closed;
    }


    public get disconnected(): Event<this, EventArgs> {
        return this._disconnected;
    }


    public get id(): number {
        return this._process.pid;
    }


    public get isKilled(): boolean {
        return this._process.killed;
    }


    protected constructor(process: NodeChildProcess) {
        this._process = process;

        this._process.on('exit', this.onExit);
        this._process.on('close', this.onClose);
        this._process.on('message', this.onMessage);
        this._process.on('disconnect', this.onDisconnect);
    }


    public send(message: ProcessMessage): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._process.send(message.payload, message.socket || message.server, (error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public kill(signal?: NodeJS.Signals): void {
        this._process.kill(signal);
    }


    @Delegate
    private onMessage(message: any, socket?: Socket | Server): void {
        this._messageReceived.dispatch(
            new ProcessMessageReceivedEventArgs(
                new ProcessMessage(
                    message,
                    socket instanceof Socket ? socket : undefined,
                    socket instanceof Server ? socket : undefined
                )
            )
        );
    }


    @Delegate
    private onExit(code: ExitCode, signal: Signals): void {
        this._exited.dispatch(
            new ProcessExitedEventArgs(code, signal)
        );
    }


    @Delegate
    private onClose(code: ExitCode, signal: Signals): void {
        this._closed.dispatch(
            new ProcessClosedEventArgs(code, signal)
        );
    }


    @Delegate
    private onDisconnect(): void {
        this._disconnected.dispatch(new EventArgs());
    }
}
