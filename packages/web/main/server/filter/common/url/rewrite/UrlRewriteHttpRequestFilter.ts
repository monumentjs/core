import {HttpRequestFilter} from '../../../HttpRequestFilter';
import {HttpRequest} from '@monument/node/main/http/server/request/HttpRequest';
import {Priority} from '@monument/core/main/Priority';
import {Component} from '@monument/core/main/stereotype/Component';
import {UrlRewriteConfiguration} from './UrlRewriteConfiguration';
import {UrlRewriteRule} from './UrlRewriteRule';
import {UrlRewriteHttpRequest} from './UrlRewriteHttpRequest';

@Component
export class UrlRewriteHttpRequestFilter implements HttpRequestFilter {
    private _configuration: UrlRewriteConfiguration;

    public readonly order: number = Priority.HIGHEST;

    public constructor(configuration: UrlRewriteConfiguration) {
        this._configuration = configuration;
    }

    public [HttpRequestFilter.filter](request: HttpRequest): HttpRequest {
        const rule: UrlRewriteRule | undefined = this._configuration.findRule(request.url);

        if (rule == null) {
            return request;
        }

        return new UrlRewriteHttpRequest(request, rule.definition.to);
    }
}
