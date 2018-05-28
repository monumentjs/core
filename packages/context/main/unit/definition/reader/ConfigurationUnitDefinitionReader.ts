import {Type} from '@monument/core/main/Type';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Configuration} from '@monument/decorators/main/stereotype/Configuration';
import {Unit} from '@monument/decorators/main/stereotype/Unit';
import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {UnitDecorator} from '@monument/decorators/main/stereotype/UnitDecorator';


export class ConfigurationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    /**
     * Derive further bean definitions from the configuration classes in the registry.
     */
    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Configuration)) {
            let methods: ReadOnlyCollection<Method> = klass.methods;

            for (const method of methods) {
                if (method.isDecoratedWith(Unit)) {
                    const unitType: Type<object> | undefined = method.getAttribute(UnitDecorator.TYPE);

                    if (unitType != null) {
                        this.rootReader.scan(unitType);

                        let unitDefinition: UnitDefinition = this.obtainUnitDefinition(unitType);

                        unitDefinition.factoryMethodName = method.name;
                        unitDefinition.factoryUnitType = type;
                    }
                }
            }
        }
    }
}
