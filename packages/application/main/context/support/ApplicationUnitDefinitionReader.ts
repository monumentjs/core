import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '@monument/context/main/unit/definition/UnitDefinition';
import {AbstractUnitDefinitionReader} from '@monument/context/main/unit/definition/reader/AbstractUnitDefinitionReader';
import {Application} from '@monument/decorators/main/stereotype/Application';
import {ApplicationDecorator} from '@monument/decorators/main/stereotype/ApplicationDecorator';


export class ApplicationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(Application)) {
            const definition: UnitDefinition = this.obtainUnitDefinition(type);
            const modules: Array<Type<object>> | undefined = klass.getDeclaredAttribute(
                ApplicationDecorator.MODULES
            );

            if (modules != null) {
                for (const module of modules) {
                    definition.dependsOn.add(module);
                    this.rootReader.scan(module);
                }
            }
        }
    }
}
