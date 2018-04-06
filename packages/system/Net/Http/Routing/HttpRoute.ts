import {IHttpRoute} from './IHttpRoute';
import {HttpRouteValueDictionary} from './HttpRouteValueDictionary';
import {HttpRequestHandler} from '../Server/HttpRequestHandler';
import {HttpRouteData} from './HttpRouteData';
import {IHttpRouteConstraint} from './IHttpRouteConstraint';
import {HttpRequest} from '../Base/HttpRequest';
import {FormattableString} from '../../../../text/main/FormattableString';
import {Enumerable} from '@monument/core/Collections/Abstraction/Enumerable';
import {Map} from '../../../../collections/main/Map';


export class HttpRoute implements IHttpRoute {
    private _routeTemplate: string;
    private _handler: HttpRequestHandler;
    private _constraints: Enumerable<IHttpRouteConstraint>;
    private _additionalValues: HttpRouteValueDictionary;
    private _defaultValues: HttpRouteValueDictionary;
    private _template: FormattableString;


    public get routeTemplate(): string {
        return this._routeTemplate;
    }


    public get handler(): HttpRequestHandler {
        return this._handler;
    }


    public get constraints(): Enumerable<IHttpRouteConstraint> {
        return this._constraints;
    }


    public get additionalValues(): HttpRouteValueDictionary {
        return this._additionalValues;
    }


    public get defaultValues(): HttpRouteValueDictionary {
        return this._defaultValues;
    }


    public constructor(routeTemplate: string,
                       handler: HttpRequestHandler,
                       defaultValues: HttpRouteValueDictionary = new HttpRouteValueDictionary(),
                       additionalValues: HttpRouteValueDictionary = new HttpRouteValueDictionary(),
                       constraints: Enumerable<IHttpRouteConstraint> = []) {
        this._routeTemplate = routeTemplate;
        this._handler = handler;
        this._defaultValues = defaultValues;
        this._additionalValues = additionalValues;
        this._constraints = constraints;

        this._template = new FormattableString(routeTemplate);
    }


    public getRouteData(request: HttpRequest): HttpRouteData | undefined {
        let routeData: HttpRouteData | undefined = this.extractRouteData(request.url.path);

        if (routeData == null) {
            return undefined;
        }

        this.addDefaultValues(routeData);
        this.addAdditionalValues(routeData);

        return routeData;
    }


    private extractRouteData(requestPath: string): HttpRouteData | undefined {
        let values: Map<string, string> | undefined = this._template.tryExtractValues(requestPath);

        if (values == null) {
            return undefined;
        }

        return new HttpRouteData(this, new HttpRouteValueDictionary(values));
    }


    private addDefaultValues(routeData: HttpRouteData): void {
        for (let {key, value} of this.defaultValues) {
            routeData.values.putIfAbsent(key, value);
        }
    }


    private addAdditionalValues(routeData: HttpRouteData): void {
        for (let {key, value} of this.additionalValues) {
            routeData.values.putIfAbsent(key, value);
        }
    }
}
