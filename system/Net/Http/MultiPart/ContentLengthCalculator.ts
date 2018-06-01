import {Encoding} from '../../../Text/Encoding';
import {ContentDispositionGenerator} from './ContentDispositionGenerator';
import {HttpForm} from '../Base/HttpForm';
import {HttpFiles} from '../Base/HttpFiles';


export class ContentLengthCalculator {
    private readonly encoding: Encoding;
    private readonly contentDispositionGenerator: ContentDispositionGenerator;


    public constructor(contentDispositionGenerator: ContentDispositionGenerator) {
        this.contentDispositionGenerator = contentDispositionGenerator;
    }


    public async calculate(form: HttpForm, files: HttpFiles): Promise<number> {
        const formFieldsLength: number = this.calculateFormFieldsLength(form);
        const filesLength: number = await this.calculateFilesLength(files);
        const lastDelimiterLength: number = this.calculateLastDelimiterLength();

        return formFieldsLength + filesLength + lastDelimiterLength;
    }


    private calculateFormFieldsLength(form: HttpForm): number {
        let length: number = 0;

        for (let {key, value} of form) {
            let disposition: string = this.contentDispositionGenerator.getFormFieldContentDisposition(key);

            length += this.encoding.getBytesCount(disposition);
            length += this.encoding.getBytesCount(value);
        }

        return length;
    }


    private async calculateFilesLength(files: HttpFiles): Promise<number> {
        let length: number = 0;

        for (let {key, value} of files) {
            for (let file of value) {
                let disposition: string = this.contentDispositionGenerator.getFileContentDisposition(key, file);

                length += this.encoding.getBytesCount(disposition);
                length += await file.length;
            }
        }

        return length;
    }


    private calculateLastDelimiterLength(): number {
        return this.encoding.getBytesCount(this.contentDispositionGenerator.getLastDelimiter());
    }
}
