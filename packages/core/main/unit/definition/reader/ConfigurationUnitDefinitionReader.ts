import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {Method} from '../../../reflection/Method';
import {ReadOnlyCollection} from '../../../collection/readonly/ReadOnlyCollection';
import {UnitDecorator} from '../../../stereotype/UnitDecorator';
import {ConfigurationDecorator} from '../../../stereotype/ConfigurationDecorator';


export class ConfigurationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    /**
     * Derive further bean definitions from the configuration classes in the registry.
     */
    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(ConfigurationDecorator)) {
            let methods: ReadOnlyCollection<Method> = klass.methods;

            for (const method of methods) {
                if (method.isDecoratedWith(UnitDecorator)) {
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
