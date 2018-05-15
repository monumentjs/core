import {IncomingMessage} from 'http';
import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {StringUtils} from '../../../../text/main/StringUtils';
import {HttpRequest} from '../Base/HttpRequest';
import {HttpHeaders} from '../Headers/HttpHeaders';
import {HeaderName} from '../Headers/HeaderName';
import {HttpMethod} from '../Base/HttpMethod';


export class HttpRequestExtractor {
    @GetInstance()
    public static readonly instance: HttpRequestExtractor;


    private constructor() {}


    public extract(message: IncomingMessage): HttpRequest {
        let requestMethod: HttpMethod = this.extractRequestMethod(message);
        let requestUrl: string = this.extractRequestUrl(message);
        let requestHeaders: HttpHeaders = this.extractRequestHeaders(message);
        let request: HttpRequest = new HttpRequest(requestMethod, requestUrl);

        request.headers.putAll(requestHeaders);

        return request;
    }


    private extractRequestMethod(message: IncomingMessage): HttpMethod {
        if (message.method == null) {
            throw new InvalidArgumentException('message', 'Invalid incoming payload: HTTP method is not defined.');
        }

        let methodName: string = StringUtils.toCapitalCase(message.method);

        return HttpMethod.valueOf(methodName);
    }


    private extractRequestUrl(message: IncomingMessage): string {
        return message.url || '/';
    }


    private extractRequestHeaders(message: IncomingMessage): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();

        Object.keys(message.headers).forEach((headerName: HeaderName) => {
            let headerValues: string | string[] | undefined = message.headers[headerName];

            if (headerValues == null) {
                return;
            }

            if (typeof headerValues === 'string') {
                headers.setTo(headerName, headerValues);
            } else {
                headerValues.forEach((headerValue: string): void => {
                    headers.setTo(headerName, headerValue);
                });
            }
        });

        return headers;
    }
}
