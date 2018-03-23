import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {Component} from '../../../stereotype/Component';
import {Init} from '../../configuration/decorators/Init';
import {Destroy} from '../../configuration/decorators/Destroy';
import {PostConstruct} from '../../configuration/decorators/PostConstruct';
import {Lazy} from '../../configuration/decorators/Lazy';
import {Primary} from '../../configuration/decorators/Primary';
import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';


export class ComponentUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);
        let definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(Component)) {
            definition.isSingleton = true;

            if (klass.isDecoratedWith(Lazy)) {
                definition.isLazyInit = true;
            }

            if (klass.isDecoratedWith(Primary)) {
                definition.isPrimary = true;
            }

            let methods = klass.methods;

            for (let method of methods) {
                if (method.isDecoratedWith(PostConstruct)) {
                    definition.postConstructMethodNames.add(method.name);
                }

                if (method.isDecoratedWith(Init)) {
                    definition.initMethodName = method.name;
                }

                if (method.isDecoratedWith(Destroy)) {
                    definition.destroyMethodName = method.name;
                }
            }
        }
    }
}
