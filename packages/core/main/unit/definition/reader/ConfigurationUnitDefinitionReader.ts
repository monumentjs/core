import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {Configuration} from '../../../stereotype/Configuration';
import {Method} from '../../../reflection/Method';
import {ReadOnlyCollection} from '../../../collection/ReadOnlyCollection';
import {Unit} from '../../../stereotype/Unit';
import {UnitDecorator} from '../../../stereotype/UnitDecorator';


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
