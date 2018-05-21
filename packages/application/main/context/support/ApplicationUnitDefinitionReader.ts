import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '@monument/context/main/unit/definition/UnitDefinition';
import {AbstractUnitDefinitionReader} from '@monument/context/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Application} from '@monument/stereotype/main/Application';
import {ApplicationConfiguration} from '@monument/stereotype/main/ApplicationConfiguration';


export class ApplicationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Application)) {
            const definition: UnitDefinition = this.obtainUnitDefinition(type);
            const configuration: ApplicationConfiguration | undefined = klass.getDeclaredAttribute(
                ApplicationConfiguration.ATTRIBUTE_KEY
            );

            if (configuration != null) {
                for (const importedType of configuration.modules) {
                    definition.dependsOn.add(importedType);
                    this.rootReader.scan(importedType);
                }
            }
        }
    }
}
