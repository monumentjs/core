import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {Property} from '@monument/reflection/main/Property';
import {TEST_CASE_ATTRIBUTE} from '../Constants';


export function Case(): MethodDecorator {
    return function (target: object, key: PropertyKey) {
        let klass: Class = Class.of(target.constructor as Type);
        let property: Property = klass.getOwnInstanceProperty(key);

        property.setOwnAttribute(TEST_CASE_ATTRIBUTE, true);
    };
}
