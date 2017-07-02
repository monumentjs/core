import {Chainable} from '../../../../../src/System/Stream/Chainable';


export class NumbersSerializer extends Chainable<number, string> {

    protected async transform(input: number): Promise<string> {
        return input.toString(10);
    }
}
