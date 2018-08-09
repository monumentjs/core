import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {Parameter} from '../../../reflection/Parameter';
import {Class} from '../../../reflection/Class';
import {Type} from '../../../Type';
import {ReadOnlyList} from '../../../collection/readonly/ReadOnlyList';
import {SingletonDecorator} from '../../../stereotype/SingletonDecorator';
import {ComponentDecorator} from '../../../stereotype/ComponentDecorator';
import {PrimaryDecorator} from '../../../stereotype/configuration/PrimaryDecorator';
import {LazyDecorator} from '../../../stereotype/configuration/LazyDecorator';


export class ComponentUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan(type: Type<object>): void {
        const klass: Class<object> = Class.of(type);
        const parameters: ReadOnlyList<Parameter> = klass.constructorParameters;
        const definition: UnitDefinition = this.obtainUnitDefinition(type);

        for (const parameter of parameters) {
            if (parameter.type != null) {
                definition.dependsOn.add(parameter.type);
            }
        }

        if (klass.getAttribute(SingletonDecorator.IS_SINGLETON) === true) {
            definition.isSingleton = true;
        }

        if (klass.isDecoratedWith(ComponentDecorator)) {
            if (klass.isDecoratedWith(LazyDecorator)) {
                definition.isLazyInit = true;
            }

            if (klass.isDecoratedWith(PrimaryDecorator)) {
                definition.isPrimary = true;
            }
        }

    }
}
