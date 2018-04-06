import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '../../../reflection/main/decorators/Target';
import {WithDecorator} from '../../../reflection/main/decorators/WithDecorator';
import {Component} from './Component';


export function Service(): ClassDecorator {
    return function (target: Function) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(target);
        WithDecorator(Service)(...arguments);
    };
}
