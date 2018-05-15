import {Type} from '@monument/core/main/Type';
import {ListMap} from '@monument/collections/main/ListMap';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {UnitDefinition} from '../UnitDefinition';
import {UnitDefinitionRegistry} from './UnitDefinitionRegistry';


export class DefaultUnitDefinitionRegistry implements UnitDefinitionRegistry {
    private readonly _registry: ListMap<Type<object>, UnitDefinition> = new ListMap();


    public get unitDefinitions(): ReadOnlyMap<Type<object>, UnitDefinition> {
        return this._registry;
    }


    public getUnitDefinition(unitType: Type<object>): UnitDefinition {
        let definition = this._registry.get(unitType);

        if (definition == null) {
            throw new NoSuchUnitDefinitionException(`Unit definition for "${unitType.name}" not found in this registry.`);
        }

        return definition;
    }


    public containsUnitDefinition(unitType: Type<object>): boolean {
        return this._registry.containsKey(unitType);
    }


    public registerUnitDefinition(unitType: Type<object>, definition: UnitDefinition): void {
        this._registry.put(unitType, definition);
    }
}
