import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {ReadOnlyCollection} from '../../../../collections/main/ReadOnlyCollection';
import {ArrayList} from '../../../../collections/main/ArrayList';
import {Map} from '../../../../collections/main/Map';
import {CaseInsensitiveMap} from '@monument/collections/main/CaseInsensitiveMap';
import {KeyValuePair} from '../../../../collections/main/KeyValuePair';


export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    LINK = 'LINK',
    HEAD = 'HEAD',
    TRACE = 'TRACE',
    CONNECT = 'CONNECT'
}


export namespace HttpMethod {
    const ALL_METHODS: Map<string, HttpMethod> = new CaseInsensitiveMap((() => {
        let keys = Object.keys(HttpMethod);

        return keys.map((key) => {
            return new KeyValuePair(key, (HttpMethod as any)[key]);
        });
    })());

    const METHODS_SUPPORTING_BODY: ReadOnlyCollection<HttpMethod> = new ArrayList([
        HttpMethod.POST,
        HttpMethod.PUT,
        HttpMethod.PATCH
    ]);

    /**
     * Returns the enum constant of this type with the specified name.
     * The string must match exactly an identifier used to declare an enum constant in this type.
     * (Extraneous whitespace characters are not permitted.)
     */
    export function valueOf(method: string): HttpMethod {
        let value: HttpMethod | undefined = resolve(method);

        if (value == null) {
            throw new InvalidArgumentException('method', `HTTP method name "${method}" is unknown`);
        }

        return value;
    }


    export function resolve(method: string): HttpMethod | undefined {
        return ALL_METHODS.get(method);
    }

    /**
     * Determine whether HttpMethod matches the given method payload.
     */
    export function isSupported(method: string): boolean {
        return ALL_METHODS.containsKey(method);
    }


    export function supportsBody(method: HttpMethod): boolean {
        return METHODS_SUPPORTING_BODY.contains(method);
    }
}
