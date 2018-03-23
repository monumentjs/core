import {Type} from '@monument/core/main/Type';
import {UnitFactoryException} from '../factory/UnitFactoryException';


export class MissingConstructorArgumentsException extends UnitFactoryException {
    public constructor(type: Type, providedArgumentsCount: number) {
        super(
            `Constructor of type ${type.name} has ${type.length} required arguments. ` +
            `But only ${providedArgumentsCount} arguments have been provided.`
        );
    }
}
