import {AbstractUnitDefinitionReader} from '@monument/context/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '@monument/context/main/unit/definition/UnitDefinition';
import {TestConfigurationDecorator} from '../../decorators/TestConfigurationDecorator';
import {TestConfiguration} from '../../decorators/TestConfiguration';


export class TestConfigurationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(TestConfiguration)) {
            const components: Array<Type<object>> | undefined = klass.getDeclaredAttribute(TestConfigurationDecorator.COMPONENTS);

            if (components != null) {
                for (let component of components) {
                    definition.dependsOn.add(component);
                    this.rootReader.scan(component);
                }
            }
        }
    }

}
