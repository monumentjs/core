import {DecoratorTarget} from '../../../core/main/decorators/support/DecoratorTarget';
import {Target} from '../../../core/main/decorators/Target';
import {Component} from './Component';
import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';


export function Repository(): ClassDecorator {
    return function (target: Function) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(target);
        WithDecorator(Repository)(...arguments);
    };
}
