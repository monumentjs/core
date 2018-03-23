import {HttpRequest} from '../../Net/Http/Base/HttpRequest';
import {HttpForm} from '../../Net/Http/Base/HttpForm';


export class FormDataBuilder {
    public readonly defaultFormValues: HttpForm = new HttpForm();
    public readonly specialFormValues: HttpForm = new HttpForm();


    public createFormData(request: HttpRequest): FormData {
        const form: FormData = new FormData();

        for (let {key, value} of this.specialFormValues) {
            form.append(key, value);
        }

        for (let {key, value} of request.form) {
            form.append(key, value);
        }

        for (let {key, value} of request.files) {
            if (value instanceof File) {
                form.append(key, value);
            }
        }

        for (let {key, value} of this.defaultFormValues) {
            if (!form.has(key)) {
                form.append(key, value);
            }
        }

        return form;
    }
}
