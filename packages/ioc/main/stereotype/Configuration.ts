import {DecoratorTarget} from '../../../reflection/main/decorators/DecoratorTarget';
import {Target} from '../../../reflection/main/decorators/Target';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Component} from './Component';


export function Configuration() {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(...arguments);
        WithDecorator(Configuration)(...arguments);
    };
}
