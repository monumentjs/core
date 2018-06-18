import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {Module} from '../../../stereotype/Module';
import {ModuleDecorator} from '../../../stereotype/ModuleDecorator';
import {AbstractUnitDefinitionReader} from '../../../unit/definition/reader/AbstractUnitDefinitionReader';
import {UnitDefinition} from '../../../unit/definition/UnitDefinition';


export class ModuleUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(Module)) {
            const components = klass.getDeclaredAttribute(ModuleDecorator.COMPONENTS);
            const dependsOn = klass.getDeclaredAttribute(ModuleDecorator.DEPENDS_ON);

            if (dependsOn != null) {
                for (let component of dependsOn) {
                    definition.dependsOn.add(component);
                    this.rootReader.scan(component);
                }
            }

            if (components != null) {
                for (let component of components) {
                    definition.dependsOn.add(component);
                    this.rootReader.scan(component);
                }
            }
        }
    }
}
