import {Type} from '../../../Type';
import {Sequence} from '../../../collection/readonly/Sequence';


export interface UnitDefinitionReader {
    scan<T extends object>(type: Type<T>): void;
    scanAll<T extends object>(types: Sequence<Type<T>>): void;
}
