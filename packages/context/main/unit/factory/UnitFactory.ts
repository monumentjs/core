import {Type} from '@monument/core/main/Type';


export interface UnitFactory {
    getUnit<T extends object>(type: Type<T>): Promise<T>;
    containsUnit<T extends object>(type: Type<T>): boolean;
    destroyUnit<T extends object>(type: Type<T>, instance: T): void;
}
