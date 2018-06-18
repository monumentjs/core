import {Type} from '../../../Type';


export interface UnitDefinitionReader {
    scan<T extends object>(type: Type<T>): void;
    scanAll<T extends object>(types: Iterable<Type<T>>): void;
}
