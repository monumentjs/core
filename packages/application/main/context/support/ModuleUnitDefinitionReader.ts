import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '@monument/context/main/unit/definition/UnitDefinition';
import {AbstractUnitDefinitionReader} from '@monument/context/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Module} from '@monument/stereotype/main/Module';
import {ModuleConfiguration} from '@monument/stereotype/main/ModuleConfiguration';


export class ModuleUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(Module)) {
            let configuration = klass.getDeclaredAttribute(ModuleConfiguration.ATTRIBUTE_KEY);

            if (configuration != null) {
                for (let importedType of configuration.components) {
                    definition.dependsOn.add(importedType);
                    this.rootReader.scan(importedType);
                }
            }
        }
    }

}
