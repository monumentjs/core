import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '@monument/context/main/unit/definition/UnitDefinition';
import {AbstractUnitDefinitionReader} from '@monument/context/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Module} from '@monument/stereotype/main/Module';
import {ModuleDecorator} from '@monument/stereotype/main/ModuleDecorator';


export class ModuleUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(Module)) {
            const components = klass.getDeclaredAttribute(ModuleDecorator.COMPONENTS);

            if (components != null) {
                for (let component of components) {
                    definition.dependsOn.add(component);
                    this.rootReader.scan(component);
                }
            }
        }
    }

}
