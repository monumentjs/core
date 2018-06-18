import {Server, Socket} from 'net';
import {Path} from '../path/Path';
import {ExitCode} from './ExitCode';
import {Channel} from './Channel';
import {ProcessInfo} from './ProcessInfo';
import {ProcessMessage} from './ProcessMessage';
import {ProcessException} from './ProcessException';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Component} from '@monument/core/main/stereotype/Component';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Event} from '@monument/core/main/events/Event';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {Delegate} from '@monument/core/main/decorators/Delegate';


@Lazy
@Component
export class CurrentProcess implements Channel<any>, ProcessInfo {
    private readonly _process: NodeJS.Process = process;
    private readonly _messageReceived: ConfigurableEvent<this, ProcessMessageReceivedEventArgs<any>> = new ConfigurableEvent();
    private readonly _disconnected: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _exited: ConfigurableEvent<this, ProcessExitedEventArgs> = new ConfigurableEvent();


    public get messageReceived(): Event<this, ProcessMessageReceivedEventArgs<any>> {
        return this._messageReceived;
    }


    public get disconnected(): Event<this, EventArgs> {
        return this._disconnected;
    }


    public get exited(): Event<this, ProcessExitedEventArgs> {
        return this._exited;
    }


    public get currentWorkingDirectory(): Path {
        return new Path(this._process.cwd());
    }


    public get groupId(): number | undefined {
        return this._process.getgid ? this._process.getgid() : undefined;
    }


    public get userId(): number | undefined {
        return this._process.getuid ? this._process.getuid() : undefined;
    }


    public get processId(): number {
        return this._process.pid;
    }


    public get parentProcessId(): number {
        return this._process.ppid;
    }


    public constructor() {
        this._process.on('exit', this.handleExit);
        this._process.on('message', this.handleMessage);
        this._process.on('disconnect', this.handleDisconnect);
    }


    public send(message: ProcessMessage<any>): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        if (this._process.send != null) {
            this._process.send.call(this._process, message.payload, message.socket || message.server, (error: Error) => {
                if (error == null) {
                    deferred.resolve();
                } else {
                    deferred.reject(error);
                }
            });
        } else {
            deferred.reject(
                new ProcessException(
                    'Unable to send payload to master process: inter-process communication (IPC) is not enabled.'
                )
            );
        }

        return deferred.promise;
    }


    public async exit(exitCode?: ExitCode): Promise<void> {
        this._process.exit(exitCode);
    }


    @Delegate
    private handleMessage(message: any, socket: Socket | Server): void {
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
    private handleExit(code: ExitCode): void {
        this._exited.trigger(
            this,
            new ProcessExitedEventArgs(code)
        );
    }


    @Delegate
    private handleDisconnect(): void {
        this._disconnected.trigger(this, EventArgs.EMPTY);
    }
}
