import {InputStream} from '../../../../stream-core/main/InputStream';


export abstract class InputStreamSpec {

    public abstract create(): InputStream<string>;


    public 'constructor() creates new instance of InputStream'() {
        let stream = this.create();

        expect(stream.isEnded).toBe(false);
        expect(stream.isClosed).toBe(false);
    }
}
