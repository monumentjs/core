import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {Target} from '@monument/core/main/decorators/Target';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {Component} from './Component';


export function Configuration() {
    return function (...args: any[]) {
        Target([DecoratorTarget.CLASS])(...arguments);
        Component()(...arguments);
        WithDecorator(Configuration)(...arguments);
    };
}
