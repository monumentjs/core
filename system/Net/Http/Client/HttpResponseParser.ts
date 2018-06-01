import * as http from 'http';
import {HttpRequest} from '../Base/HttpRequest';
import {HttpResponse} from '../Base/HttpResponse';
import {HttpResponseReader} from './HttpResponseReader';
import {HttpHeaders} from '../Headers/HttpHeaders';
import {JsonContent} from '../Content/JsonContent';
import {HeaderName} from '../Headers/HeaderName';
import {MediaType} from '@monument/system/Net/Http/Mime/MediaType';


export class HttpResponseParser {
    protected readonly headersConverter: HttpHeaderCollectionConverter = new HttpHeaderCollectionConverter();


    public async parse(message: http.IncomingMessage, request: HttpRequest): Promise<HttpResponse> {
        const response: HttpResponse = this.createHttpResponse(message, request);
        const messageReader: HttpResponseReader = this.createMessageReader(message);
        const data: Buffer = await messageReader.readAll();
        const contentType: MediaType | undefined = response.headers.contentType;

        if (contentType) {
            if (contentType.equals(MediaType.APPLICATION_JSON)) {
                let json: string = data.toString();

                response.content = new JsonContent(JSON.parse(json));
            }
        }

        return response;
    }


    protected createMessageReader(message: http.IncomingMessage): HttpResponseReader {
        return new HttpResponseReader(message);
    }


    protected createHttpResponse(message: http.IncomingMessage, request: HttpRequest): HttpResponse {
        const response: HttpResponse = new HttpResponse(
            request.url,
            request.method,
            message.statusCode,
            message.statusMessage
        );

        this.attachHeaders(response, message);

        return response;
    }


    protected attachHeaders(response: HttpResponse, message: http.IncomingMessage): void {
        const responseHeaders: HttpHeaders = this.headersConverter.fromJSON(message.headers);

        responseHeaders.copyTo(response.headers);
    }
}
