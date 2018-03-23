import {Type} from '@monument/core/main/Type';
import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {UnitDefinition} from '../UnitDefinition';


export interface UnitDefinitionRegistry {
    readonly unitTypes: ReadOnlySet<Type<object>>;

    /**
     * @throws {NoSuchUnitDefinitionException}
     */
    getUnitDefinition<T extends object>(type: Type<T>): UnitDefinition;

    containsUnitDefinition<T extends object>(type: Type<T>): boolean;

    /**
     * @throws {UnitDefinitionStoreException}
     */
    registerUnitDefinition<T extends object>(type: Type<T>, definition: UnitDefinition): void;
}
