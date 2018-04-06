import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {AbstractUnitDefinitionReader} from '@monument/ioc/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Application} from '../../decorators/Application';
import {ApplicationConfiguration} from '../../configuration/ApplicationConfiguration';


export class ApplicationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Application)) {
            let configuration = klass.getDeclaredAttribute(ApplicationConfiguration.ATTRIBUTE_KEY);

            if (configuration != null) {
                for (let importedType of configuration.modules) {
                    this.rootReader.scan(importedType);
                }
            }
        }
    }
}
