import {EMPTY_STRING, EOL_CRLF} from '@monument/core/main/constants';
import {StringBuilder} from '@monument/text/main/StringBuilder';
import {MimeTypeResolver} from '../../Mime/MimeTypeResolver';
import {HeaderName} from '../Headers/HeaderName';
import {ContentBoundary} from './ContentBoundary';
import {FileInputStream} from '@monument/system/main/file-system/FileInputStream';


export class ContentDispositionGenerator {
    private readonly _mimeTypeResolver: MimeTypeResolver = MimeTypeResolver.instance;
    private readonly _boundary: ContentBoundary;


    public constructor(boundary: ContentBoundary) {
        this._boundary = boundary;
    }


    public getFormFieldContentDisposition(fieldName: string): string {
        const sb = new StringBuilder();

        sb.linesSeparator = EOL_CRLF;

        sb.appendLine();
        sb.appendLine(this._boundary.chunkDelimiter);
        sb.appendLine(HeaderName.ContentDisposition + `: form-data; name="${fieldName}"`);
        sb.appendLine();

        return sb.toString();
    }


    public getFileContentDisposition(fieldName: string, file: FileInputStream): string {
        let path = new Path(file.path);
        let fileExtensionWithoutLeadingDot: string = path.extension.replace(/^\.+/, EMPTY_STRING);
        let fileName: string = path.baseName;
        let mimeType: string = this._mimeTypeResolver.findTypeByExtension(fileExtensionWithoutLeadingDot);
        let sb: StringBuilder = new StringBuilder();

        sb.linesSeparator = EOL_CRLF;

        sb.appendLine();
        sb.appendLine(this._boundary.chunkDelimiter);
        sb.appendLine(`${HeaderName.ContentDisposition}: form-data; name="${fieldName}"; filename="${fileName}"`);
        sb.appendLine(`${HeaderName.ContentType}: ${mimeType}`);
        sb.appendLine();

        return sb.toString();
    }


    public getLastDelimiter(): string {
        return `${EOL_CRLF}${this._boundary.lastDelimiter}${EOL_CRLF}`;
    }
}
