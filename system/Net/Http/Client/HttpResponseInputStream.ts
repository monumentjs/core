import * as http from 'http';
import {ArrayList} from '../../../../collections/main/ArrayList';
import {AbstractInputStream} from '../../../Stream/AbstractInputStream';
import {HttpResponse} from '../Base/HttpResponse';
import {HttpRequest} from '../Base/HttpRequest';


export class HttpResponseInputStream extends AbstractInputStream<Buffer, http.IncomingMessage> {
    private _response: HttpResponse;

    public get response(): HttpResponse {
        return this._response;
    }


    public constructor(request: HttpRequest, incomingMessage: http.IncomingMessage) {
        super(incomingMessage);

        this._response = this.createResponse(request);
    }


    private createResponse(request: HttpRequest): HttpResponse {
        let response = new HttpResponse(
            request.url,
            request.method,
            this._baseStream.statusCode,
            this._baseStream.statusMessage
        );

        Object.keys(this._baseStream.headers).forEach((name: string) => {
            let value: string | string[] | undefined = this._baseStream.headers[name];

            if (value != null) {
                if (typeof value === 'string') {
                    response.headers.setTo(name, value);
                } else {
                    response.headers.put(name, new ArrayList(value));
                }
            }
        });

        return response;
    }
}
