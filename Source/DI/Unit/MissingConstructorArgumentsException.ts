import {UnitFactoryException} from './UnitFactoryException';
import {Type} from '../../Core/Types/Type';


export class MissingConstructorArgumentsException extends UnitFactoryException {
    public constructor(type: Type, providedArgumentsCount: number) {
        super(
            `Constructor of type ${type.name} has ${type.length} required arguments. ` +
            `But only ${providedArgumentsCount} arguments have been provided.`
        );
    }
}
