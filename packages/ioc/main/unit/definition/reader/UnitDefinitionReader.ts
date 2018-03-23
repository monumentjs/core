import {Type} from '@monument/core/main/Type';


export interface UnitDefinitionReader {
    scan<T extends object>(root: Type<T>): void;
}
