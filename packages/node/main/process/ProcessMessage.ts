import {Server, Socket} from 'net';


export class ProcessMessage {
    public readonly payload: any;
    public readonly socket: Socket | undefined;
    public readonly server: Server | undefined;


    public constructor(payload: any, socket?: Socket, server?: Server) {
        this.payload = payload;
        this.socket = socket;
        this.server = server;
    }
}
