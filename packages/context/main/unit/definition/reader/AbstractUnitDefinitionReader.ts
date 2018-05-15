import {Type} from '@monument/core/main/Type';
import {UnitDefinitionRegistry} from '../registry/UnitDefinitionRegistry';
import {UnitDefinition} from '../UnitDefinition';
import {UnitDefinitionReader} from './UnitDefinitionReader';


export abstract class AbstractUnitDefinitionReader implements UnitDefinitionReader {
    protected readonly registry: UnitDefinitionRegistry;
    protected readonly rootReader: UnitDefinitionReader;


    public constructor(registry: UnitDefinitionRegistry, rootReader: UnitDefinitionReader) {
        this.registry = registry;
        this.rootReader = rootReader;
    }


    public abstract scan(root: Type<object>): void;


    protected obtainUnitDefinition<T extends object>(type: Type<T>): UnitDefinition {
        let definition: UnitDefinition;

        if (this.registry.containsUnitDefinition(type)) {
            definition = this.registry.getUnitDefinition(type);
        } else {
            definition = new UnitDefinition();

            this.registry.registerUnitDefinition(type, definition);
        }

        return definition;
    }
}
