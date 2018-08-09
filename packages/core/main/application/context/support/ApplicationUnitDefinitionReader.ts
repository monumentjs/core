import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {ApplicationDecorator} from '../../../stereotype/ApplicationDecorator';
import {AbstractUnitDefinitionReader} from '../../../unit/definition/reader/AbstractUnitDefinitionReader';
import {UnitDefinition} from '../../../unit/definition/UnitDefinition';


export class ApplicationUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        const klass: Class<T> = Class.of(type);

        if (klass.isDecoratedWith(ApplicationDecorator)) {
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
