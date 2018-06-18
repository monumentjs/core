import {TestConfigurationDecorator} from '../../decorators/TestConfigurationDecorator';
import {TestConfiguration} from '../../decorators/TestConfiguration';
import {AbstractUnitDefinitionReader} from '@monument/core/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/core/main/reflection/Class';
import {UnitDefinition} from '@monument/core/main/unit/definition/UnitDefinition';


export class TestClassConfigurationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(TestConfiguration)) {
            const components: Array<Type<object>> | undefined = klass.getDeclaredAttribute(TestConfigurationDecorator.COMPONENTS);
            const modules: Array<Type<object>> | undefined = klass.getDeclaredAttribute(TestConfigurationDecorator.MODULES);

            if (components != null) {
                for (let component of components) {
                    definition.dependsOn.add(component);
                    this.rootReader.scan(component);
                }
            }

            if (modules != null) {
                for (let module of modules) {
                    definition.dependsOn.add(module);
                    this.rootReader.scan(module);
                }
            }
        }
    }

}
