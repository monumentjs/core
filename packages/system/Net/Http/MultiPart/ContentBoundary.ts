import {CharSequenceGenerator} from '../../../../text/main/CharSequenceGenerator';
import {RandomCharSequenceGenerator} from '../../../../text/main/RandomCharSequenceGenerator';
import {MediaType} from '../Mime/MediaType';


export class ContentBoundary {
    private static generator: CharSequenceGenerator = new RandomCharSequenceGenerator();

    public static readonly DEFAULT_BOUNDARY_LENGTH: number = 64;


    public static generate(length: number = this.DEFAULT_BOUNDARY_LENGTH): ContentBoundary {
        return new ContentBoundary(this.generator.generate(length, RandomCharSequenceGenerator.ALPHA_NUMERIC_CHARSET));
    }

    private _chunkDelimiter: string;
    private _lastDelimiter: string;
    private _contentTypeHeaderValue: MediaType;
    private _delimiter: string;


    public get chunkDelimiter(): string {
        return this._chunkDelimiter;
    }


    public get lastDelimiter(): string {
        return this._lastDelimiter;
    }


    public get contentTypeHeaderValue(): MediaType {
        return this._contentTypeHeaderValue;
    }


    public get delimiter(): string {
        return this._delimiter;
    }


    public constructor(delimiter: string) {
        this._delimiter = delimiter;
        this._chunkDelimiter = `--${delimiter}`;
        this._lastDelimiter = `--${delimiter}--`;
        this._contentTypeHeaderValue = MediaType.parseMediaType(MediaType.MULTIPART_FORM_DATA_VALUE + '; boundary=' + delimiter);
    }
}
