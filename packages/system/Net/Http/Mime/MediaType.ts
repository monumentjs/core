import {Encoding} from '../../../Text/Encoding';
import {Map} from '../../../../collections-core/main/Map';
import {MimeType} from './MimeType';
import {List} from '../../../../collections-core/main/List';
import {ReadOnlyMap} from '../../../../collections-core/main/ReadOnlyMap';
import {Assert} from '@monument/core/Assertion/Assert';
import {InvalidMediaTypeException} from './InvalidMediaTypeException';
import {InvalidMimeTypeException} from './InvalidMimeTypeException';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {MimeTypeUtils} from './MimeTypeUtils';
import {Collection} from '../../../../collections-core/main/Collection';
import {ListMap} from '../../../../collections/main/ListMap';
import {ArrayList} from '../../../../collections/main/ArrayList';


export class MediaType extends MimeType {
    private static readonly MEDIA_TYPES_SEPARATOR_PATTERN: RegExp = /\s*,\s*/g;

    protected static readonly QUALITY_PARAMETER_NAME: string = 'q';

    public static readonly TEXT_PLAIN_VALUE = 'text/plain';
    public static readonly TEXT_PLAIN = MediaType.parseMediaType(MediaType.TEXT_PLAIN_VALUE);

    public static readonly TEXT_HTML_VALUE = 'text/html';
    public static readonly TEXT_HTML = MediaType.parseMediaType(MediaType.TEXT_HTML_VALUE);

    public static readonly TEXT_XML_VALUE = 'text/xml';
    public static readonly TEXT_XML = MediaType.parseMediaType(MediaType.TEXT_XML_VALUE);

    public static readonly APPLICATION_JSON_VALUE = 'application/json';
    public static readonly APPLICATION_JSON = MediaType.parseMediaType(MediaType.APPLICATION_JSON_VALUE);

    public static readonly APPLICATION_FORM_URL_ENCODED_VALUE = 'application/x-www-form-urlencoded';
    public static readonly APPLICATION_FORM_URL_ENCODED = MediaType.parseMediaType(MediaType.APPLICATION_FORM_URL_ENCODED_VALUE);

    public static readonly MULTIPART_FORM_DATA_VALUE = 'multipart/form-data';
    public static readonly MULTIPART_FORM_DATA = MediaType.parseMediaType(MediaType.MULTIPART_FORM_DATA_VALUE);


    public static asMediaType(type: MimeType): MediaType {
        return new MediaType(type.type, type.subType, 1, type.charset, type.parameters);
    }


    public static asMediaTypes(types: List<MimeType>): List<MediaType> {
        return types.select((type: MimeType): MediaType => {
            return this.asMediaType(type);
        });
    }

    /**
     * Parse the given String into a single {@code MediaType}.
     * @throws InvalidMediaTypeException if the media type value cannot be parsed
     */
    public static parseMediaType(mediaType: string): MediaType {
        let type: MimeType;

        try {
            type = MimeTypeUtils.parseMimeType(mediaType);
        } catch (ex) {
            if (ex instanceof InvalidMimeTypeException) {
                throw new InvalidMediaTypeException(mediaType, ex.message);
            }

            throw ex;
        }

        try {
            return new MediaType(type.type, type.subType, undefined, undefined, type.parameters);
        } catch (ex) {
            if (ex instanceof InvalidArgumentException) {
                throw new InvalidMediaTypeException(mediaType, ex.message);
            }

            throw ex;
        }
    }


    public static parseMediaTypes(mediaTypes: string): List<MediaType> {
        return new ArrayList(mediaTypes.split(this.MEDIA_TYPES_SEPARATOR_PATTERN).map((token: string) => {
            return token.trim();
        }).filter((token: string) => {
            return token.length > 0;
        }).map((token: string) => {
            return this.parseMediaType(token);
        }));
    }


    public static toString(mediaTypes: Collection<MediaType>): string {
        return MimeTypeUtils.toString(mediaTypes);
    }


    public get quality(): number {
        const parameterValue: string | undefined = this.parameters.get(MediaType.QUALITY_PARAMETER_NAME);

        if (parameterValue == null) {
            return 1;
        }

        return parseFloat(parameterValue);
    }


    public constructor(
        type: string,
        subtype: string = MimeType.WILDCARD_TYPE,
        quality: number = 1,
        charset?: Encoding,
        parameters: ReadOnlyMap<string, string> = new ListMap()
    ) {
        let combinedParameters: Map<string, string> = new ListMap(parameters);

        combinedParameters.put(MediaType.QUALITY_PARAMETER_NAME, quality.toString());

        super(type, subtype, charset, combinedParameters);
    }


    protected checkParameter(key: string, value: string): void {
        super.checkParameter(key, value);

        if (key === MediaType.QUALITY_PARAMETER_NAME) {
            value = this.unquote(value);

            let d: number = parseFloat(value);

            Assert.argument(`parameters["${key}"].value`, d).bounds(0, 1);
        }
    }
}
