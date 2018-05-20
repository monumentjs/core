import {Server, Socket} from 'net';


export class ProcessMessage<TPayload> {
    public readonly payload: TPayload;
    public readonly socket: Socket | undefined;
    public readonly server: Server | undefined;


    public constructor(payload: TPayload, socket?: Socket, server?: Server) {
        this.payload = payload;
        this.socket = socket;
        this.server = server;
    }
}
