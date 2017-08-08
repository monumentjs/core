import {ContainerException} from './ContainerException';
import {Constructor} from '../../types';


export class MissingConstructorArgumentsException extends ContainerException {
    public constructor(type: Constructor<any>, providedArgumentsCount: number) {
        super(
            `Constructor of type ${type.name} has ${type.length} required arguments. ` +
            `But only ${providedArgumentsCount} arguments have been provided.`
        );
    }
}
