import {Exception} from '../../../Exceptions/Exception';


export class DecoratorException extends Exception {
    public constructor(decoratorName: string, errorMessage: string) {
        super(`Error in @${decoratorName} decorator: ${errorMessage}`);
    }
}
