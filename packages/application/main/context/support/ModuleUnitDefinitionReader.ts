import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {AbstractUnitDefinitionReader} from '@monument/ioc/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Module} from '@monument/stereotype/main/Module';
import {ModuleConfiguration} from '@monument/stereotype/main/ModuleConfiguration';


export class ModuleUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Module)) {
            let configuration = klass.getDeclaredAttribute(ModuleConfiguration.ATTRIBUTE_KEY);

            if (configuration != null) {
                for (let importedType of configuration.imports) {
                    this.rootReader.scan(importedType);
                }

                for (let exportedType of configuration.exports) {
                    this.rootReader.scan(exportedType);
                }
            }
        }
    }

}
