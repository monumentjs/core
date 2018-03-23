import {UnitDefinition} from '../../UnitDefinition';
import {UnitDefinitionRegistry} from '../../UnitDefinitionRegistry';


export interface UnitNameGenerator {
    generateUnitName(definition: UnitDefinition, registry: UnitDefinitionRegistry): string;
}
