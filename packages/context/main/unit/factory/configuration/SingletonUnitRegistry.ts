import {Type} from '@monument/core/main/Type';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';


export interface SingletonUnitRegistry {
    readonly singletons: ReadOnlyMap<Type<object>, object>;

    containsSingleton(unitType: Type<object>): boolean;
    getSingleton<T extends object>(unitType: Type<T>): T | undefined;
    registerSingleton<T extends object>(unitType: Type<T>, unitObject: T): void;
}
