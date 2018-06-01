import {HttpRequestSender} from '../../Net/Http/HttpRequestSender';
import {AjaxRequest} from './AjaxRequest';
import {HttpRequest} from '../../Net/Http/Base/HttpRequest';
import {HttpResponse} from '../../Net/Http/Base/HttpResponse';
import {DeferredObject} from '../../../async/main/DeferredObject';
import {FormDataBuilder} from './FormDataBuilder';
import {HttpHeaders} from '../../Net/Http/Headers/HttpHeaders';
import {XmlHttpResponseConverter} from './XmlHttpResponseConverter';


export class HttpClient implements HttpRequestSender {
    private readonly formDataBuilder: FormDataBuilder;

    private readonly requestFactory: AjaxRequest;

    private readonly responseConverter: XmlHttpResponseConverter;


    public get defaultHeaders(): HttpHeaders {
        return this.requestFactory.defaultHeaders;
    }


    public send(request: HttpRequest): Promise<HttpResponse> {
        let deferred: DeferredObject<HttpResponse> = new DeferredObject();
        let xhr: XMLHttpRequest = this.createXmlHttpRequest(request, deferred);
        let formData: FormData = this.getFormData(request);

        xhr.send(formData);

        return deferred.promise;
    }


    private createXmlHttpRequest(request: HttpRequest, deferred: DeferredObject<HttpResponse>): XMLHttpRequest {
        let xhr: XMLHttpRequest = this.requestFactory.createRequest(request);

        xhr.addEventListener('load', () => {
            let response: HttpResponse = this.responseConverter.convert(request, xhr);

            deferred.resolve(response);
        });

        xhr.addEventListener('error', (event: ErrorEvent) => {
            deferred.reject(event.error);
        });

        return xhr;
    }


    private getFormData(request: HttpRequest): FormData | undefined {
        let formData: FormData | undefined;

        if (request.supportsBody) {
            formData = this.formDataBuilder.createFormData(request);
        }

        return formData;
    }
}
