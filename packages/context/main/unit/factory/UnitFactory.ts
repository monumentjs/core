import {Type} from '@monument/core/main/Type';
import {UnitRequest} from './UnitRequest';


export interface UnitFactory {
    getUnit<T extends object>(request: UnitRequest<T> | Type<T>): Promise<T>;
    containsUnit(type: Type<object>): boolean;
    destroyUnit<T extends object>(type: Type<T>, instance: T): void;
}
