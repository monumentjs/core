import {StreamSupport} from '../../../../Source/Stream/StreamSupport';


export class NumbersSerializer extends StreamSupport<number, string> {

    protected async transform(input: number): Promise<string> {
        return input.toString(10);
    }
}
