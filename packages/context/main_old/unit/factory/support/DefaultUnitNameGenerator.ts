import {UnitDefinition} from '../../UnitDefinition';
import {UnitDefinitionRegistry} from '../../UnitDefinitionRegistry';
import {UnitNameGenerator} from './UnitNameGenerator';


export class DefaultUnitNameGenerator implements UnitNameGenerator {
    private static readonly RADIX: number = 16;

    private _lastIndex: number = 0;


    public generateUnitName(definition: UnitDefinition, registry: UnitDefinitionRegistry): string {
        let unitName: string;

        do {
            unitName = this._lastIndex.toString(DefaultUnitNameGenerator.RADIX);

            this._lastIndex++;
        } while (registry.isUnitNameInUse(unitName));

        return unitName;
    }
}
