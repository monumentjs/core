import {Encoding} from '../../../Text/Encoding';
import {HttpContent} from '../Content/HttpContent';
import {HttpRequestOutputStream} from '../Client/HttpRequestOutputStream';
import {ContentBoundary} from './ContentBoundary';
import {ContentDispositionGenerator} from './ContentDispositionGenerator';
import {ContentLengthCalculator} from './ContentLengthCalculator';
import {HttpFiles} from '../Base/HttpFiles';
import {HttpForm} from '../Base/HttpForm';


export class FormDataContent extends HttpContent {
    private _contentDispositionGenerator: ContentDispositionGenerator;
    private _contentLengthCalculator: ContentLengthCalculator;

    private _encoding: Encoding;
    private _boundary: ContentBoundary;
    private _form: HttpForm;
    private _files: HttpFiles;


    public get boundary(): ContentBoundary {
        return this._boundary;
    }


    public get encoding(): Encoding {
        return this._encoding;
    }


    public set encoding(value: Encoding) {
        this._encoding = value;
    }


    public get form(): HttpForm {
        return this._form;
    }


    public get files(): HttpFiles {
        return this._files;
    }


    public constructor(form: HttpForm, files: HttpFiles = new HttpFiles()) {
        super();

        this._encoding = Encoding.UTF_8;
        this._form = form;
        this._files = files;
        this._boundary = ContentBoundary.generate();
        this._contentDispositionGenerator = new ContentDispositionGenerator(this._boundary);
        this._contentLengthCalculator = new ContentLengthCalculator(this._contentDispositionGenerator);
    }


    public async copyTo(writer: HttpRequestOutputStream): Promise<void> {
        await this.refresh();

        writer.setHeaders(this.headers);

        await this.writeForm(writer);
        await this.writeFiles(writer);
        await this.writeLastDelimiter(writer);
    }


    public async refresh(): Promise<void> {
        this.headers.contentType = this._boundary.contentTypeHeaderValue;
        this.headers.contentLength = await this._contentLengthCalculator.calculate(this._form, this._files);
    }


    private async writeForm(writer: HttpRequestOutputStream): Promise<void> {
        for (const {key, value} of this._form) {
            await this.writeText(writer, this._contentDispositionGenerator.getFormFieldContentDisposition(key));
            await this.writeText(writer, value);
        }
    }


    private async writeFiles(writer: HttpRequestOutputStream): Promise<void> {
        for (const {key, value} of this._files) {
            for (const file of value) {
                await this.writeText(writer, this._contentDispositionGenerator.getFileContentDisposition(key, file));

                await file.copyTo(writer);
            }
        }
    }


    private writeLastDelimiter(writer: HttpRequestOutputStream): Promise<void> {
        return this.writeText(writer, this._contentDispositionGenerator.getLastDelimiter());
    }


    private writeText(writer: HttpRequestOutputStream, text: string): Promise<void> {
        return writer.write(this.encodeText(text));
    }


    private encodeText(text: string): Buffer {
        return this.encoding.getBytes(text);
    }
}
