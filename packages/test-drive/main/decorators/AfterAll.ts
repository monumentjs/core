import {Class} from '@monument/core/Language/Reflection/Class';
import {Property} from '@monument/core/Language/Reflection/Property';
import {AFTER_ALL_ATTRIBUTE} from '../Constants';


export function AfterAll(): MethodDecorator {
    return function (target: any, key: PropertyKey) {
        let klass = Class.of(target.constructor);
        let property: Property = klass.getOwnInstanceProperty(key);

        property.setOwnAttribute(AFTER_ALL_ATTRIBUTE, true);
    };
}
