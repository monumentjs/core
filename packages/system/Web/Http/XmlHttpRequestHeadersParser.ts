import {HttpHeaders} from '../../Net/Http/Headers/HttpHeaders';
import {HeaderName} from '../../Net/Http/Headers/HeaderName';


const HEADERS_PAIR_DELIMITER: string = '\u000d\u000a';
const HEADER_NAME_VALUE_DELIMITER: string = '\u003a\u0020';


export class XmlHttpRequestHeadersParser {
    public parse(headersString: string): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders();
        const headerPairs: string[] = headersString.split(HEADERS_PAIR_DELIMITER);

        headerPairs.forEach((headerPair: string) => {
            let delimiterIndex: number = headerPair.indexOf(HEADER_NAME_VALUE_DELIMITER);

            if (delimiterIndex > 0) {
                let headerName: string = headerPair.substring(0, delimiterIndex);
                let headerValue: string = headerPair.substring(delimiterIndex + 2);

                headers.set(headerName as HeaderName, headerValue);
            }
        });

        return headers;
    }
}
