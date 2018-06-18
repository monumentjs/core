import {Server, Socket} from 'net';
import {ChildProcess as NodeChildProcess} from 'child_process';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ChildProcess} from './ChildProcess';
import {ProcessMessage} from './ProcessMessage';
import {ExitCode} from './ExitCode';
import Signals = NodeJS.Signals;
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Event} from '@monument/core/main/events/Event';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {Delegate} from '@monument/core/main/decorators/Delegate';


export abstract class AbstractChildProcess<TMessage> implements ChildProcess<TMessage> {
    private readonly _process: NodeChildProcess;
    private readonly _messageReceived: ConfigurableEvent<this, ProcessMessageReceivedEventArgs<TMessage>> = new ConfigurableEvent();
    private readonly _disconnected: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _exited: ConfigurableEvent<this, ProcessExitedEventArgs> = new ConfigurableEvent();
    private readonly _closed: ConfigurableEvent<this, ProcessClosedEventArgs> = new ConfigurableEvent();


    public get messageReceived(): Event<this, ProcessMessageReceivedEventArgs<TMessage>> {
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

        this._process.on('exit', this.handleExit);
        this._process.on('close', this.handleClose);
        this._process.on('message', this.handleMessage);
        this._process.on('disconnect', this.handleDisconnect);
    }


    public send(message: ProcessMessage<TMessage>): Promise<void> {
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
    private handleMessage(message: any, socket?: Socket | Server): void {
        this._messageReceived.trigger(
            this,
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
    private handleExit(code: ExitCode, signal: Signals): void {
        this._exited.trigger(
            this,
            new ProcessExitedEventArgs(code, signal)
        );
    }


    @Delegate
    private handleClose(code: ExitCode, signal: Signals): void {
        this._closed.trigger(
            this,
            new ProcessClosedEventArgs(code, signal)
        );
    }


    @Delegate
    private handleDisconnect(): void {
        this._disconnected.trigger(this, EventArgs.EMPTY);
    }
}
