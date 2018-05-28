import {Type} from '@monument/core/main/Type';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {Class} from '@monument/reflection/main/Class';
import {Parameter} from '@monument/reflection/main/Parameter';
import {Component} from '@monument/decorators/main/stereotype/Component';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {Primary} from '@monument/decorators/main/stereotype/configuration/Primary';
import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';


export class ComponentUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan(type: Type<object>): void {
        let klass: Class<object> = Class.of(type);
        let parameters: ReadOnlyMap<number, Parameter> = klass.constructorParameters;
        let definition: UnitDefinition = this.obtainUnitDefinition(type);

        for (const {value: parameter} of parameters) {
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
