import {DefaultHttpServer} from '../../../node/main/http/server/support/DefaultHttpServer';


export class WebApplication {
    private readonly _server: DefaultHttpServer;

    public constructor() {
        this._server = new DefaultHttpServer();
    }
}
