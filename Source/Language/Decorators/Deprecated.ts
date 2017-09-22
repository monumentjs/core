import {Decorator} from '../Support/Decorators/Decorator';
import {Type} from '../../Core/Types/Type';
import {DecoratorTarget} from '../Support/Decorators/DecoratorTarget';
import {Target} from './Target';


export function Deprecated(message?: string) {
    return function (type: object | Type, key: PropertyKey) {
        Target(DecoratorTarget.Class, DecoratorTarget.Method, DecoratorTarget.Property, DecoratorTarget.Accessor)(...arguments);

        const decoratorType = Decorator.findTarget(arguments);

        if (message == null) {
            switch (decoratorType) {
                case DecoratorTarget.Class:
                    message = `Class "${(type as Type).name}" is deprecated. It will be removed or replaced in future releases.`;
                    break;

                case DecoratorTarget.Method:
                    message = `Method "${key}" is deprecated. It will be removed or replaced in future releases.`;
                    break;

                case DecoratorTarget.Accessor:
                    message = `Accessor "${key}" is deprecated. It will be removed or replaced in future releases.`;
                    break;

                case DecoratorTarget.Property:
                    message = `Property "${key}" is deprecated. It will be removed or replaced in future releases.`;
                    break;

                default:
            }
        }

        /* tslint:disable:no-console */
        return console.warn(message);
        /* tslint:enable:no-console */
    };
}
