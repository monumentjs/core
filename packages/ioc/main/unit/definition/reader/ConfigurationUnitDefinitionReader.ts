import {Type} from '@monument/core/main/Type';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Configuration} from '@monument/stereotype/main/Configuration';
import {UnitConfiguration} from '@monument/stereotype/main/UnitConfiguration';
import {Unit} from '@monument/stereotype/main/Unit';
import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';


export class ConfigurationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    /**
     * Derive further bean definitions from the configuration classes in the registry.
     */
    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Configuration)) {
            let methods: ReadOnlyCollection<Method> = klass.methods;

            for (let method of methods) {
                if (method.isDecoratedWith(Unit)) {
                    let configuration = method.getAttribute(UnitConfiguration.ATTRIBUTE_KEY);

                    if (configuration != null) {
                        this.rootReader.scan(configuration.type);

                        let unitDefinition: UnitDefinition = this.obtainUnitDefinition(configuration.type);

                        unitDefinition.factoryMethodName = method.name;
                        unitDefinition.factoryUnitType = type;
                    }
                }
            }
        }
    }
}
