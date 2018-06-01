import {ServerResponse} from 'http';
import {AbstractOutputStream} from '../../../Stream/AbstractOutputStream';
import {StatusCode} from '../Base/StatusCode';
import {HttpHeaders} from '../Headers/HttpHeaders';


export class HttpResponseOutputStream extends AbstractOutputStream<Buffer, ServerResponse> {

    public setStatusCode(value: StatusCode): void {
        this.baseStream.statusCode = value;
    }


    public setStatusMessage(value: string): void {
        this.baseStream.statusMessage = value;
    }


    public setHeaders(headers: HttpHeaders): void {
        for (const {key: name, value: values} of headers) {
            for (const value of values) {
                this.baseStream.setHeader(name, value);
            }
        }
    }
}
