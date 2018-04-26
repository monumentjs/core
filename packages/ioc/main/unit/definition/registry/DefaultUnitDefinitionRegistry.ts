import {Type} from '@monument/core/main/Type';
import {Map} from '@monument/collections/main/Map';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {ListMap} from '@monument/collections/main/ListMap';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {UnitDefinition} from '../UnitDefinition';
import {UnitDefinitionRegistry} from './UnitDefinitionRegistry';


export class DefaultUnitDefinitionRegistry implements UnitDefinitionRegistry {
    private readonly _registry: Map<Type<object>, UnitDefinition> = new ListMap();


    public get unitTypes(): ReadOnlySet<Type<object>> {
        return this._registry.keys;
    }


    public getUnitDefinition<T extends object>(type: Type<T>): UnitDefinition {
        let definition = this._registry.get(type);

        if (definition == null) {
            throw new NoSuchUnitDefinitionException(`Unit definition for "${type.name}" not found in this registry.`);
        }

        return definition;
    }


    public containsUnitDefinition<T extends object>(type: Type<T>): boolean {
        return this._registry.containsKey(type);
    }


    public registerUnitDefinition<T extends object>(type: Type<T>, definition: UnitDefinition): void {
        this._registry.put(type, definition);
    }
}
