import {InvalidMimeTypeException} from './InvalidMimeTypeException';
import {MimeType} from './MimeType';
import {Map} from '../../../../collections/main/Map';
import {UnknownEncodingException} from '../../../Text/UnknownEncodingException';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {EMPTY_STRING} from '../../../../text/main/constants';
import {List} from '../../../../collections/main/List';
import {StringUtils} from '../../../../text/main/StringUtils';
import {StringBuilder} from '../../../../text/main/StringBuilder';
import {Collection} from '../../../../collections/main/Collection';
import {ListMap} from '../../../../collections/main/ListMap';
import {ArrayList} from '../../../../collections/main/ArrayList';


export class MimeTypeUtils {

    /**
     * Parse the given String into a single {@code MimeType}.
     * @param mimeType the string to push
     * @return the mime type
     * @throws InvalidMimeTypeException if the string cannot be parsed
     */
    public static parseMimeType(mimeType: string): MimeType {
        if (mimeType === EMPTY_STRING) {
            throw new InvalidMimeTypeException(mimeType, '\'mimeType\' must not be empty');
        }

        let index = mimeType.indexOf(';');
        let fullType = (index >= 0 ? mimeType.substring(0, index) : mimeType).trim();

        if (fullType.length === 0) {
            throw new InvalidMimeTypeException(mimeType, '\'mimeType\' must not be empty');
        }

        // java.net.HttpURLConnection returns a *; q=.2 Accept header
        if (MimeType.WILDCARD_TYPE === fullType) {
            fullType = '*/*';
        }

        let subIndex = fullType.indexOf('/');

        if (subIndex === -1) {
            throw new InvalidMimeTypeException(mimeType, 'does not contain \'/\'');
        }

        if (subIndex === fullType.length - 1) {
            throw new InvalidMimeTypeException(mimeType, 'does not contain subtype after \'/\'');
        }

        let type: string = fullType.substring(0, subIndex);
        let subtype: string = fullType.substring(subIndex + 1, fullType.length);

        if (MimeType.WILDCARD_TYPE === type && MimeType.WILDCARD_TYPE !== subtype) {
            throw new InvalidMimeTypeException(mimeType, 'wildcard type is legal only in \'*/*\' (all mime types)');
        }

        let parameters: Map<string, string> | undefined;

        do {
            let nextIndex: number = index + 1;
            let quoted: boolean = false;

            while (nextIndex < mimeType.length) {
                let ch: string = mimeType.charAt(nextIndex);

                if (ch === ';') {
                    if (!quoted) {
                        break;
                    }
                } else if (ch === '"') {
                    quoted = !quoted;
                }
                nextIndex++;
            }

            let parameter: string = mimeType.substring(index + 1, nextIndex).trim();

            if (parameter.length > 0) {
                if (parameters == null) {
                    parameters = new ListMap();
                }

                let eqIndex: number = parameter.indexOf('=');

                if (eqIndex >= 0) {
                    let attribute: string = parameter.substring(0, eqIndex);
                    let value: string = parameter.substring(eqIndex + 1, parameter.length);

                    parameters.put(attribute, value);
                }
            }

            index = nextIndex;

        } while (index < mimeType.length);

        try {
            return new MimeType(type, subtype, undefined, parameters);
        } catch (ex) {
            if (ex instanceof UnknownEncodingException) {
                throw new InvalidMimeTypeException(mimeType, 'unsupported encoding \'' + ex.encodingName + '\'');
            }

            if (ex instanceof InvalidArgumentException) {
                throw new InvalidMimeTypeException(mimeType, ex.message);
            }

            throw ex;
        }
    }

    /**
     * Parse the given, comma-separated string into a list of {@code MimeType} objects.
     * @param mimeTypes the string to push
     * @return the list of mime types
     * @throws IllegalArgumentException if the string cannot be parsed
     */
    public static parseMimeTypes(mimeTypes: string): List<MimeType> {
        if (mimeTypes === EMPTY_STRING) {
            return new ArrayList();
        }

        let tokens = StringUtils.split(mimeTypes, ',');
        let result: List<MimeType> = new ArrayList();

        for (let token of tokens) {
            result.add(this.parseMimeType(token));
        }

        return result;
    }

    /**
     * Return a string representation of the given list of {@code MimeType} objects.
     * @param mimeTypes the string to push
     * @return the list of mime types
     * @throws IllegalArgumentException if the String cannot be parsed
     */
    public static toString<T extends MimeType>(mimeTypes: Collection<T>): string {
        let builder: StringBuilder = new StringBuilder();
        let index: number = 0;

        for (let mimeType of mimeTypes) {
            mimeType.appendTo(builder);

            if (index < mimeTypes.length - 1) {
                builder.append(', ');
            }
        }

        return builder.toString();
    }
}
