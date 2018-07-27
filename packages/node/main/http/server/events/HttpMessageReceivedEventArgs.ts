import {EventArgs} from '@monument/core/main/events/EventArgs';
import {ServerRequestWrapper} from '../request/ServerRequestWrapper';
import {ServerResponseWrapper} from '../response/ServerResponseWrapper';


export class HttpMessageReceivedEventArgs extends EventArgs {
    public readonly request: ServerRequestWrapper;
    public readonly response: ServerResponseWrapper;

    public constructor(request: ServerRequestWrapper, response: ServerResponseWrapper) {
        super();

        this.request = request;
        this.response = response;
    }
}
