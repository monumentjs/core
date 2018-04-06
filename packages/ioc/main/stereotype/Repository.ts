import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '../../../reflection/main/decorators/Target';
import {Component} from './Component';
import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';


export function Repository(): ClassDecorator {
    return function (target: Function) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(target);
        WithDecorator(Repository)(...arguments);
    };
}
