import {JSONSerializable} from '../../../../core/main/JSONSerializable';
import {List} from '../../../../collections/main/List';
import {ArrayList} from '../../../../collections/main/ArrayList';
import {Set} from '../../../../collections/main/Set';
import {ListSet} from '../../../../collections/main/ListSet';
import {ReadOnlyMap} from '../../../../collections/main/ReadOnlyMap';
import {CaseInsensitiveMultiValueMap} from '@monument/collections/main/CaseInsensitiveMultiValueMap';
import {StringUtils} from '../../../../text/main/StringUtils';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {DateTime} from '../../../../time/main/DateTime';
import {HttpRange} from '../Base/HttpRange';
import {HttpMethod} from '../Base/HttpMethod';
import {MediaType} from '../Mime/MediaType';
import {ContentDisposition} from '../MultiPart/ContentDisposition';
import {Uri} from '../../Uri/Uri';
import {LanguageRange} from '../../../Text/Locale/LanguageRange';
import {Encoding} from '../../../Text/Encoding';
import {HeaderName} from './HeaderName';


export interface HttpHeadersJson {
    [name: string]: string | string[];
}


export class HttpHeaders extends CaseInsensitiveMultiValueMap<string> implements JSONSerializable<HttpHeadersJson> {
    /**
     * Pattern matching ETag multiple field values in headers such as "If-Match", "If-None-Match"
     * @see <a href="https://tools.ietf.org/html/rfc7232#section-2.3">Section 2.3 of RFC 7232</a>
     */
    private static readonly ETAG_HEADER_VALUE_PATTERN: RegExp = /\*|\s*((W\/)?("[^"]*"))\s*,?/;


    /**
     * Return the list of acceptable media types, as specified by the Accept header.
     * Returns an empty list when the acceptable media types are unspecified.
     */
    public get accept(): List<MediaType> {
        const value: string | undefined = this.getFirst(HeaderName.Accept);

        if (value != null) {
            return MediaType.parseMediaTypes(value);
        }

        return new ArrayList();
    }


    /**
     * Set the list of acceptable {@linkplain MediaType media types},
     * as specified by the {@code Accept} header.
     */
    public set accept(value: List<MediaType>) {
        this.setTo(HeaderName.Accept, MediaType.toString(value));
    }


    /**
     * Return the language ranges from the {@literal "Accept-Language"} header.
     * If you only need sorted, preferred locales only use
     * {@link #getAcceptLanguageAsLocales()} or if you need to filter based on
     * a list of supported locales you can pass the returned list to
     * {@link Locale#filter(List, Collection)}.
     */
    public get acceptLanguage(): List<LanguageRange> {
        let value: string | undefined = this.getFirst(HeaderName.AcceptLanguage);

        return (value && StringUtils.hasText(value) ? LanguageRange.parse(value) : new ArrayList());
    }


    /**
     * Set the acceptable language ranges, as specified by the
     * {@literal Accept-Language} header.
     */
    public set acceptLanguage(languages: List<LanguageRange>) {
        let values = languages.select((range) => {
            if (range.weight === LanguageRange.MAX_WEIGHT) {
                return range.range;
            } else {
                return range.range + ';q=' + range.weight.toPrecision(1);
            }
        }).toArray();

        this.setTo(HeaderName.AcceptLanguage, values.join(', '));
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Allow-Credentials} response header.
     */
    public set accessControlAllowCredentials(allowCredentials: boolean) {
        this.setTo(HeaderName.AccessControlAllowCredentials, String(allowCredentials));
    }


    /**
     * Return the payload of the {@code Access-Control-Allow-Credentials} response header.
     */
    public get accessControlAllowCredentials(): boolean {
        return Boolean(this.getFirst(HeaderName.AccessControlAllowCredentials));
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Allow-Headers} response header.
     */
    public set accessControlAllowHeaders(allowedHeaders: List<string>) {
        this.setTo(HeaderName.AccessControlAllowHeaders, this.toCommaDelimitedString(allowedHeaders));
    }


    /**
     * Return the payload of the {@code Access-Control-Allow-Headers} response header.
     */
    public get accessControlAllowHeaders(): List<string> {
        return this.getValuesAsList(HeaderName.AccessControlAllowHeaders);
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Allow-Methods} response header.
     */
    public set accessControlAllowMethods(allowedMethods: List<HttpMethod>) {
        this.setTo(HeaderName.AccessControlAllowMethods, StringUtils.collectionToDelimitedString(allowedMethods, ','));
    }


    /**
     * Return the payload of the {@code Access-Control-Allow-Methods} response header.
     */
    public get accessControlAllowMethods(): List<HttpMethod> {
        let result: List<HttpMethod> = new ArrayList();
        let value = this.getFirst(HeaderName.AccessControlAllowMethods);

        if (value != null) {
            let tokens: string[] = StringUtils.split(value, ',').map((token) => token.toUpperCase());

            for (const token of tokens) {
                let resolved: HttpMethod | undefined = (HttpMethod as any)[token];

                if (resolved != null) {
                    result.add(resolved);
                }
            }
        }

        return result;
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Allow-Origin} response header.
     */
    public set accessControlAllowOrigin(allowedOrigin: string | undefined) {
        this.setTo(HeaderName.AccessControlAllowOrigin, allowedOrigin);
    }


    /**
     * Return the payload of the {@code Access-Control-Allow-Origin} response header.
     */
    public get accessControlAllowOrigin(): string | undefined {
        return this.getFieldValues(HeaderName.AccessControlAllowOrigin);
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Expose-Headers} response header.
     */
    public set accessControlExposeHeaders(exposedHeaders: List<string>) {
        this.setTo(HeaderName.AccessControlExposeHeaders, this.toCommaDelimitedString(exposedHeaders));
    }


    /**
     * Return the payload of the {@code Access-Control-Expose-Headers} response header.
     */
    public get accessControlExposeHeaders(): List<string> {
        return this.getValuesAsList(HeaderName.AccessControlExposeHeaders);
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Max-Age} response header.
     */
    public set accessControlMaxAge(maxAge: number) {
        this.setTo(HeaderName.AccessControlMaxAge, maxAge.toString());
    }


    /**
     * Return the payload of the {@code Access-Control-Max-Age} response header.
     * <p>Returns -1 when the max age is unknown.
     */
    public get accessControlMaxAge(): number {
        let value: string | undefined = this.getFirst(HeaderName.AccessControlMaxAge);

        return (value != null ? parseInt(value, 10) : -1);
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Request-Headers} request header.
     */
    public set accessControlRequestHeaders(requestHeaders: List<string>) {
        this.setTo(HeaderName.AccessControlRequestHeaders, this.toCommaDelimitedString(requestHeaders));
    }


    /**
     * Return the payload of the {@code Access-Control-Request-Headers} request header.
     */
    public get accessControlRequestHeaders(): List<string> {
        return this.getValuesAsList(HeaderName.AccessControlRequestHeaders);
    }


    /**
     * Set the (new) payload of the {@code Access-Control-Request-Method} request header.
     */
    public set accessControlRequestMethod(requestMethod: HttpMethod | undefined) {
        this.setTo(HeaderName.AccessControlRequestHeaders, requestMethod as any);
    }


    /**
     * Return the payload of the {@code Access-Control-Request-Method} request header.
     */
    public get accessControlRequestMethod(): HttpMethod | undefined {
        let value = this.getFirst(HeaderName.AccessControlRequestMethod);

        if (value != null) {
            return HttpMethod.resolve(value);
        }

        return undefined;
    }


    /**
     * Set the list of acceptable {@linkplain Charset charsets},
     * as specified by the {@code Accept-Charset} header.
     */
    public set acceptCharset(acceptableCharsets: List<Encoding>) {
        let value = acceptableCharsets.select((charset) => {
            return charset.encodingName.toLowerCase();
        }).toArray().join(', ');

        this.setTo(HeaderName.AcceptCharset, value);
    }


    /**
     * Return the list of acceptable {@linkplain Charset charsets},
     * as specified by the {@code Accept-Charset} header.
     */
    public get acceptCharset(): List<Encoding> {
        const value: string | undefined = this.getFirst(HeaderName.AcceptCharset);

        if (value != null) {
            const tokens: string[] = StringUtils.split(value, ',');
            const result: List<Encoding> = new ArrayList();

            for (const token of tokens) {
                const paramIdx: number = token.indexOf(';');
                let charsetName: string;

                if (paramIdx === -1) {
                    charsetName = token;
                } else {
                    charsetName = token.substring(0, paramIdx);
                }

                if (charsetName !== '*') {
                    result.add(Encoding.getByWebName(charsetName));
                }
            }

            return result;
        } else {
            return new ArrayList();
        }
    }


    /**
     * Set the set of allowed {@link HttpMethod HTTP methods},
     * as specified by the {@code Allow} header.
     */
    public set allow(allowedMethods: Set<HttpMethod>) {
        this.setTo(HeaderName.Allow, StringUtils.collectionToDelimitedString(allowedMethods, ','));
    }


    /**
     * Return the set of allowed {@link HttpMethod HTTP methods},
     * as specified by the {@code Allow} header.
     * <p>Returns an empty set when the allowed methods are unspecified.
     */
    public get allow(): Set<HttpMethod> {
        const value: string | undefined = this.getFirst(HeaderName.Allow);
        const result: Set<HttpMethod> = new ListSet();

        if (value != null && !StringUtils.isEmpty(value)) {
            const tokens: string[] = StringUtils.split(value, ',');

            for (const token of tokens) {
                let resolved: HttpMethod | undefined = HttpMethod.resolve(token);

                if (resolved != null) {
                    result.add(resolved);
                }
            }
        }

        return result;
    }


    /**
     * Set the (new) payload of the {@code Cache-Control} header.
     */
    public set cacheControl(cacheControl: string | undefined) {
        this.setTo(HeaderName.CacheControl, cacheControl);
    }


    /**
     * Return the payload of the {@code Cache-Control} header.
     */
    public get cacheControl(): string | undefined {
        return this.getFieldValues(HeaderName.CacheControl);
    }


    /**
     * Set the (new) payload of the {@code Connection} header.
     */
    public set connection(connection: List<string>) {
        this.setTo(HeaderName.Connection, this.toCommaDelimitedString(connection));
    }


    /**
     * Return the payload of the {@code Connection} header.
     */
    public get connection(): List<string> {
        return this.getValuesAsList(HeaderName.Connection);
    }


    /**
     * Set the {@literal Content-Disposition} header.
     * <p>This could be used on a response to indicate if the content is
     * expected to be displayed inline in the browser or as an attachment to be
     * saved locally.
     * <p>It can also be used for a {@code "multipart/form-data"} request.
     * For more details see notes on {@link #setContentDispositionFormData}.
     */
    public set contentDisposition(contentDisposition: ContentDisposition) {
        this.setTo(HeaderName.ContentDisposition, contentDisposition.toString());
    }


    /**
     * Return a parsed representation of the {@literal Content-Disposition} header.
     */
    public get contentDisposition(): ContentDisposition {
        let contentDisposition: string | undefined = this.getFirst(HeaderName.ContentDisposition);

        if (contentDisposition != null) {
            return ContentDisposition.parse(contentDisposition);
        }

        return ContentDisposition.empty();
    }


    /**
     * Set the {@link Locale} of the content language,
     * as specified by the {@literal Content-Language} header.
     * <p>Use {@code set(CONTENT_LANGUAGE, ...)} if you need
     * to set multiple content languages.</p>
     * @since 5.0
     */
    public set contentLanguage(locale: Locale | undefined) {
        this.setTo(HeaderName.ContentLanguage, (locale != null ? locale.toLanguageTag() : null));
    }


    /**
     * Return the first {@link Locale} of the content languages,
     * as specified by the {@literal Content-Language} header.
     * <p>Returns {@code null} when the content language is unknown.
     * <p>Use {@code getValuesAsList(CONTENT_LANGUAGE)} if you need
     * to get multiple content languages.</p>
     */
    public get contentLanguage(): Locale | undefined {
        return this.getValuesAsList(HeaderName.ContentLanguage)
            .stream()
            .findFirst()
            .map(Locale.forLanguageTag)
            .orElse(null);
    }


    /**
     * Set the length of the body in bytes, as specified by the
     * {@code Content-Length} header.
     */
    public set contentLength(contentLength: number) {
        this.setTo(HeaderName.ContentLength, contentLength.toString());
    }


    /**
     * Return the length of the body in bytes, as specified by the
     * {@code Content-Length} header.
     * <p>Returns -1 when the content-length is unknown.
     */
    public get contentLength(): number {
        let value: string | undefined = this.getFirst(HeaderName.ContentLength);

        return (value != null ? parseInt(value, 10) : -1);
    }


    /**
     * Set the {@linkplain MediaType media type} of the body,
     * as specified by the {@code Content-Type} header.
     */
    public set contentType(mediaType: MediaType | undefined) {
        if (mediaType != null) {
            if (!mediaType.isWildcardType) {
                throw new InvalidArgumentException('mediaType', '"Content-Type" cannot contain wildcard type "*"');
            }

            if (!mediaType.isWildcardSubType) {
                throw new InvalidArgumentException('mediaType', '"Content-Type" cannot contain wildcard subtype "*"');
            }

            this.setTo(HeaderName.ContentType, mediaType.toString());
        } else {
            this.setTo(HeaderName.ContentType, undefined);
        }
    }


    /**
     * Return the {@linkplain MediaType media type} of the body, as specified
     * by the {@code Content-Type} header.
     * <p>Returns {@code null} when the content-type is unknown.
     */
    public get contentType(): MediaType | undefined {
        let value: string | undefined = this.getFirst(HeaderName.ContentType);

        return value != null && value.length > 0 ? MediaType.parseMediaType(value) : undefined;
    }


    /**
     * Set the date and time at which the payload was created, as specified
     * by the {@code Date} header.
     * <p>The date should be specified as the number of milliseconds since
     * January 1, 1970 GMT.
     */
    public set date(date: number) {
        this.setDate(HeaderName.Date, date);
    }


    /**
     * Return the date and time at which the payload was created, as specified
     * by the {@code Date} header.
     * <p>The date is returned as the number of milliseconds since
     * January 1, 1970 GMT. Returns -1 when the date is unknown.
     * @throws IllegalArgumentException if the payload can't be converted to a date
     */
    public get date(): number {
        return this.getFirstDate(HeaderName.Date);
    }


    /**
     * Set the (new) entity tag of the body, as specified by the {@code ETag} header.
     */
    public set etag(etag: string | undefined) {
        if (etag != null) {
            if (etag.startsWith('"') || etag.startsWith('W/')) {
                throw new InvalidArgumentException('value', 'Invalid ETag: does not run with W/ or "');
            }

            if (etag.endsWith('"')) {
                throw new InvalidArgumentException('value', 'Invalid ETag: does not end with "');
            }

            this.setTo(HeaderName.ETag, etag);
        }
    }


    /**
     * Return the entity tag of the body, as specified by the {@code ETag} header.
     */
    public get etag(): string | undefined {
        return this.getFirst(HeaderName.ETag);
    }


    /**
     * Set the date and time at which the payload is no longer valid,
     * as specified by the {@code Expires} header.
     * <p>The date should be specified as the number of milliseconds since
     * January 1, 1970 GMT.
     */
    public set expires(expires: number) {
        this.setDate(HeaderName.Expires, expires);
    }


    /**
     * Return the date and time at which the payload is no longer valid,
     * as specified by the {@code Expires} header.
     * <p>The date is returned as the number of milliseconds since
     * January 1, 1970 GMT. Returns -1 when the date is unknown.
     * @see #getFirstDateTime(String)
     */
    public get expires(): number {
        return this.getFirstDate(HeaderName.Expires, false);
    }


    /**
     * Set the (new) payload of the {@code Host} header.
     * @since 5.0
     */
    public set host(host: string | undefined) {
        this.setTo(HeaderName.Host, host);
    }


    /**
     * Return the payload of the required {@code Host} header.
     * <p>If the header payload does not contain a port, the returned
     * @since 5.0
     */
    public get host(): string | undefined {
        return this.getFirst(HeaderName.Host);
    }


    /**
     * Set the (new) payload of the {@code If-Match} header.
     * @since 4.3
     */
    public set ifMatch(ifMatchList: List<string>) {
        this.setTo(HeaderName.IfMatch, this.toCommaDelimitedString(ifMatchList));
    }


    /**
     * Return the payload of the {@code If-Match} header.
     * @since 4.3
     */
    public get ifMatch(): List<string> {
        return this.getETagValuesAsList(HeaderName.IfMatch);
    }


    /**
     * Set the (new) payload of the {@code If-Modified-Since} header.
     * <p>The date should be specified as the number of milliseconds since
     * January 1, 1970 GMT.
     */
    public set ifModifiedSince(ifModifiedSince: number) {
        this.setDate(HeaderName.IfModifiedSince, ifModifiedSince);
    }


    /**
     * Return the payload of the {@code If-Modified-Since} header.
     * <p>The date is returned as the number of milliseconds since
     * January 1, 1970 GMT. Returns -1 when the date is unknown.
     * @see #getFirstDateTime(String)
     */
    public get ifModifiedSince(): number {
        return this.getFirstDate(HeaderName.IfModifiedSince, false);
    }


    /**
     * Set the (new) payload of the {@code If-None-Match} header.
     */
    public set ifNoneMatch(ifNoneMatchList: List<string>) {
        this.setTo(HeaderName.IfNoneMatch, this.toCommaDelimitedString(ifNoneMatchList));
    }


    /**
     * Return the payload of the {@code If-None-Match} header.
     */
    public get ifNoneMatch(): List<string> {
        return this.getETagValuesAsList(HeaderName.IfNoneMatch);
    }


    /**
     * Set the (new) payload of the {@code If-Unmodified-Since} header.
     * <p>The date should be specified as the number of milliseconds since
     * January 1, 1970 GMT.
     * @since 4.3
     */
    public set ifUnmodifiedSince(ifUnmodifiedSince: number) {
        this.setDate(HeaderName.IfUnmodifiedSince, ifUnmodifiedSince);
    }


    /**
     * Return the payload of the {@code If-Unmodified-Since} header.
     * <p>The date is returned as the number of milliseconds since
     * January 1, 1970 GMT. Returns -1 when the date is unknown.
     * @since 4.3
     * @see #getFirstDateTime(String)
     */
    public get ifUnmodifiedSince(): number {
        return this.getFirstDate(HeaderName.IfUnmodifiedSince, false);
    }


    /**
     * Set the time the resource was last changed, as specified by the
     * {@code Last-Modified} header.
     * <p>The date should be specified as the number of milliseconds since
     * January 1, 1970 GMT.
     */
    public set lastModified(lastModified: number) {
        this.setDate(HeaderName.LastModified, lastModified);
    }


    /**
     * Return the time the resource was last changed, as specified by the
     * {@code Last-Modified} header.
     * <p>The date is returned as the number of milliseconds since
     * January 1, 1970 GMT. Returns -1 when the date is unknown.
     * @see #getFirstDateTime(String)
     */
    public get lastModified(): number {
        return this.getFirstDate(HeaderName.LastModified, false);
    }


    /**
     * Set the (new) location of a resource,
     * as specified by the {@code Location} header.
     */
    public set location(location: Uri | undefined) {
        this.setTo(HeaderName.Location, location != null ? location.toString() : undefined);
    }


    /**
     * Return the (new) location of a resource
     * as specified by the {@code Location} header.
     * <p>Returns {@code null} when the location is unknown.
     */
    public get location(): Uri | undefined {
        let value: string | undefined = this.getFirst(HeaderName.Location);

        return (value != null ? Uri.parse(value) : undefined);
    }


    /**
     * Set the (new) payload of the {@code Origin} header.
     */
    public set origin(origin: string | undefined) {
        this.setTo(HeaderName.Origin, origin);
    }


    /**
     * Return the payload of the {@code Origin} header.
     */
    public get origin(): string | undefined {
        return this.getFirst(HeaderName.Origin);
    }


    /**
     * Set the (new) payload of the {@code Pragma} header.
     */
    public set pragma(pragma: string | undefined) {
        this.setTo(HeaderName.Pragma, pragma);
    }


    /**
     * Return the payload of the {@code Pragma} header.
     */
    public get pragma(): string | undefined {
        return this.getFirst(HeaderName.Pragma);
    }


    /**
     * Sets the (new) payload of the {@code Range} header.
     */
    public set range(ranges: List<HttpRange>) {
        let value = HttpRange.toString(ranges);

        this.setTo(HeaderName.Range, value);
    }


    /**
     * Return the payload of the {@code Range} header.
     * <p>Returns an empty list when the range is unknown.
     */
    public get range(): List<HttpRange> {
        let value: string | undefined = this.getFirst(HeaderName.Range);

        if (value == null) {
            return new ArrayList();
        }

        return HttpRange.parseRanges(value);
    }


    /**
     * Set the (new) payload of the {@code Upgrade} header.
     */
    public set upgrade(upgrade: string | undefined) {
        this.setTo(HeaderName.Upgrade, upgrade);
    }


    /**
     * Return the payload of the {@code Upgrade} header.
     */
    public get upgrade(): string | undefined {
        return this.getFirst(HeaderName.Upgrade);
    }


    /**
     * Set the request header names (e.g. "Accept-Language") for which the
     * response is subject to content negotiation and variances based on the
     * payload of those request headers.
     * @param requestHeaders the request header names
     * @since 4.3
     */
    public set vary(requestHeaders: List<string>) {
        this.setTo(HeaderName.Vary, this.toCommaDelimitedString(requestHeaders));
    }


    /**
     * Return the request header names subject to content negotiation.
     * @since 4.3
     */
    public get vary(): List<string> {
        return this.getValuesAsList(HeaderName.Vary);
    }


    public constructor(headers?: ReadOnlyMap<string, List<string>>) {
        super(headers);
    }


    public setTo(name: string, value: string | undefined): void {
        if (value != null) {
            super.setTo(name, value);
        } else {
            this.remove(name);
        }
    }


    public clone(): HttpHeaders {
        return new HttpHeaders(this);
    }


    public toJSON(): HttpHeadersJson {
        let json: HttpHeadersJson = Object.create(null);

        for (const {key: name, value: values} of this) {
            if (values.length > 1) {
                json[name] = values.toArray();
            } else if (values.length === 1) {
                json[name] = values.getAt(0);
            }
        }

        return json;
    }


    /**
     * Set the {@code Content-Disposition} header when creating a
     * {@code "multipart/form-data"} request.
     * <p>Applications typically would not set this header directly but
     * rather prepare a {@code LinkedMultiValueMap<String, Object>}, containing an
     * Object or a {@link org.springframework.core.io.Resource} for each part,
     * and then pass that to the {@code RestTemplate} or {@code WebClient}.
     * @param name the control name
     * @param filename the filename (may be {@code null})
     * @see #getContentDisposition()
     */
    public setContentDispositionFormData(name: string, filename?: string) {
        let disposition: ContentDisposition.Builder = ContentDisposition.builder('form-data').name(name);

        if (filename != null) {
            disposition.setFileName(filename);
        }

        this.contentDisposition = disposition.build();
    }


    /**
     * Set the given date under the given header name after formatting it as a string
     * using the RFC-1123 date-time formatter. The equivalent of
     * {@link #set(String, String)} but for date headers.
     * @since 3.2.4
     * @see #setDateTime(String, DateTime)
     */
    public setDate(headerName: string, date: number): void {
        let instant: Date = new Date(date);
        let DateTime: DateTime = DateTime.ofInstant(instant, GMT);

        this.setTo(headerName, HttpHeaders.DATE_FORMATTERS[0].format(DateTime));
    }


    /**
     * Set the given date under the given header name after formatting it as a string
     * using the RFC-1123 date-time formatter. The equivalent of
     * {@link #set(String, String)} but for date headers.
     * @since 5.0
     */
    public setDateTime(headerName: string, date: DateTime) {
        this.setTo(headerName, HttpHeaders.DATE_FORMATTERS[0].format(date));
    }


    /**
     * Return all values of a given header name,
     * even if this header is set multiple times.
     * @param headerName the header name
     * @return all associated values
     * @since 4.3
     */
    public getValuesAsList(headerName: string): List<string> {
        const values: List<string> | undefined = this.get(headerName);
        const result: List<string> = new ArrayList();

        if (values != null) {
            for (const value of values) {
                if (value != null) {
                    const tokens: string[] = StringUtils.split(value, ',');

                    for (const token of tokens) {
                        result.add(token);
                    }
                }
            }
        }

        return result;
    }


    /**
     * Retrieve a combined result from the field values of the ETag header.
     * @param headerName the header name
     * @return the combined result
     * @since 4.3
     */
    protected getETagValuesAsList(headerName: string): List<string> {
        let values: List<string> | undefined = this.get(headerName);
        let result: List<string> = new ArrayList();

        if (values != null) {
            for (let value of values) {
                if (value != null) {
                    let matcher: Matcher = HttpHeaders.ETAG_HEADER_VALUE_PATTERN.matcher(value);

                    while (matcher.find()) {
                        if ('*'.equals(matcher.group())) {
                            result.add(matcher.group());
                        } else {
                            result.add(matcher.group(1));
                        }
                    }

                    if (result.isEmpty) {
                        throw new InvalidArgumentException(
                            'value',
                            `Could not parse header "${headerName}" with value "${value}"`
                        );
                    }
                }
            }
        }

        return result;
    }


    /**
     * Retrieve a combined result from the field values of multi-valued headers.
     */
    protected getFieldValues(headerName: string): string | undefined {
        let headerValues: List<string> | undefined = this.get(headerName);

        return (headerValues != null ? this.toCommaDelimitedString(headerValues) : undefined);
    }


    /**
     * Turn the given list of header values into a comma-delimited result.
     */
    protected toCommaDelimitedString(headerValues: List<string>): string {
        return headerValues.toArray().join(', ');
    }


    /**
     * Parse the first header payload for the given header name as a date,
     * return -1 if there is no payload or also in case of an invalid payload
     * (if {@code rejectInvalid=false}), or raise {@link InvalidArgumentException}
     * if the payload cannot be parsed as a date.
     * @param headerName the header name
     * @param rejectInvalid whether to reject invalid values with an
     * {@link InvalidArgumentException} ({@code true}) or rather return -1
     * in that case ({@code false})
     * @return the parsed date header, or -1 if none (or invalid)
     * @see #getFirstDateTime(String, boolean)
     */
    private getFirstDate(headerName: string, rejectInvalid: boolean = true): number {
        let dateTime: DateTime = this.getFirstDateTime(headerName, rejectInvalid);

        return (DateTime != null ? dateTime.toInstant().toEpochMilli() : -1);
    }


    /**
     * Parse the first header payload for the given header name as a date,
     * return {@code null} if there is no payload or also in case of an invalid payload
     * (if {@code rejectInvalid=false}), or raise {@link IllegalArgumentException}
     * if the payload cannot be parsed as a date.
     * @param headerName the header name
     * @param rejectInvalid whether to reject invalid values with an
     * {@link IllegalArgumentException} ({@code true}) or rather return {@code null}
     * in that case ({@code false})
     * @return the parsed date header, or {@code null} if none (or invalid)
     */
    private getFirstDateTime(headerName: string, rejectInvalid: boolean = true): DateTime | undefined {
        let headerValue: string | undefined = this.getFirst(headerName);

        if (headerValue == null) {
            // No header payload sent at all
            return undefined;
        }

        if (headerValue.length >= 3) {
            // Short "0" or "-1" like values are never valid HTTP date headers...
            // Let's only bother with DateTimeFormatter parsing for long enough values.

            // See https://stackoverflow.com/questions/12626699/if-modified-since-http-header-passed-by-ie9-includes-length
            let parametersIndex: number = headerValue.indexOf(';');

            if (parametersIndex !== -1) {
                headerValue = headerValue.substring(0, parametersIndex);
            }

            for (let dateFormatter of HttpHeaders.DATE_FORMATTERS) {
                try {
                    return DateTime.parse(headerValue, dateFormatter);
                } catch (ex) {
                    // ignore
                }
            }
        }

        if (rejectInvalid) {
            throw new InvalidArgumentException(
                'value',
                `Cannot parse date value "${headerValue}" for "${headerName}" header`
            );
        }

        return undefined;
    }
}
