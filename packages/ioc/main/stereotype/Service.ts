import {DecoratorTarget} from '../../../core/main/decorators/support/DecoratorTarget';
import {Target} from '../../../core/main/decorators/Target';
import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';
import {Component} from './Component';


export function Service(): ClassDecorator {
    return function (target: Function) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(target);
        WithDecorator(Service)(...arguments);
    };
}
