import { Class } from '@monument/core/Language/Reflection/Class';
import { Property } from '@monument/core/Language/Reflection/Property';
import { DecoratorTarget } from '@monument/core/Language/Support/DecoratorTarget';
import { IGNORE_ATTRIBUTE } from '../Constants';


const ALLOWED_TARGETS = [DecoratorTarget.CLASS, DecoratorTarget.METHOD];


export function Ignore(): any {
    return function (target: any, key: PropertyKey): void {
        DecoratorTarget.testSupport(arguments, ALLOWED_TARGETS);

        let klass: Class;
        let property: Property;

        switch (DecoratorTarget.fromDecoratorArguments(arguments)) {
            case DecoratorTarget.CLASS:
                klass = Class.of(target);

                klass.setOwnAttribute(IGNORE_ATTRIBUTE, true);

                break;

            case DecoratorTarget.METHOD:
                klass = Class.of(target.constructor);
                property = klass.getOwnInstanceProperty(key);

                property.setOwnAttribute(IGNORE_ATTRIBUTE, true);

                break;

            default:
        }
    };
}
