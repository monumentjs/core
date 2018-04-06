import {Type} from '@monument/core/main/Type';
import {ReadOnlyCollection} from '../../../../../collections/main/ReadOnlyCollection';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Component} from '../../../stereotype/Component';
import {Init} from '../../configuration/decorators/Init';
import {PostConstruct} from '../../configuration/decorators/PostConstruct';
import {PreDestroy} from '../../configuration/decorators/PreDestroy';
import {Lazy} from '../../configuration/decorators/Lazy';
import {Primary} from '../../configuration/decorators/Primary';
import {Destroy} from '../../configuration/decorators/Destroy';
import {Qualifier} from '../../configuration/decorators/Qualifier';
import {QualifierConfiguration} from '../../configuration/decorators/QualifierConfiguration';
import {UnitDefinition} from '../UnitDefinition';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';


export class ComponentUnitDefinitionReader extends AbstractUnitDefinitionReader {

    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);
        let methods: ReadOnlyCollection<Method> = klass.methods;
        let definition: UnitDefinition = this.obtainUnitDefinition(type);

        if (klass.isDecoratedWith(Component)) {
            definition.isSingleton = true;

            if (klass.isDecoratedWith(Lazy)) {
                definition.isLazyInit = true;
            }

            if (klass.isDecoratedWith(Primary)) {
                definition.isPrimary = true;
            }

            if (klass.isDecoratedWith(Qualifier)) {
                let configuration = klass.getAttribute(QualifierConfiguration.ATTRIBUTE_KEY);

                if (configuration != null) {
                    definition.qualifier = configuration.qualifier;
                }
            }

            for (let method of methods) {
                if (method.isDecoratedWith(PostConstruct)) {
                    definition.postConstructMethodNames.add(method.name);
                }

                if (method.isDecoratedWith(PreDestroy)) {
                    definition.preDestroyMethodNames.add(method.name);
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
