import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {Parameter} from '../../../reflection/Parameter';
import {Class} from '../../../reflection/Class';
import {Type} from '../../../Type';
import {Singleton} from '../../../stereotype/Singleton';
import {Lazy} from '../../../stereotype/configuration/Lazy';
import {Primary} from '../../../stereotype/configuration/Primary';
import {Component} from '../../../stereotype/Component';
import {ReadOnlyList} from '../../../collections/ReadOnlyList';


export class ComponentUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan(type: Type<object>): void {
        let klass: Class<object> = Class.of(type);
        let parameters: ReadOnlyList<Parameter> = klass.constructorParameters;
        let definition: UnitDefinition = this.obtainUnitDefinition(type);

        for (const parameter of parameters) {
            if (parameter.type != null) {
                definition.dependsOn.add(parameter.type);
            }
        }

        if (klass.isDecoratedWith(Singleton)) {
            definition.isSingleton = true;
        }

        if (klass.isDecoratedWith(Component)) {
            if (klass.isDecoratedWith(Lazy)) {
                definition.isLazyInit = true;
            }

            if (klass.isDecoratedWith(Primary)) {
                definition.isPrimary = true;
            }
        }
    }
}
