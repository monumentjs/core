import {Target} from '@monument/core/main/decorators/Target';
import {DecoratorTarget} from '@monument/core/main/decorators/support/DecoratorTarget';
import {WithDecorator} from '@monument/reflection/main/decorators/WithDecorator';
import {WithAttribute} from '@monument/reflection/main/decorators/WithAttribute';
import {Component} from '../../../stereotype/Component';
import {PostProcessorTarget} from './PostProcessorTarget';
import {PostProcessorDecoratorConfiguration} from './PostProcessorDecoratorConfiguration';


export function PostProcessor(targets: Iterable<PostProcessorTarget>, order?: number): ClassDecorator {
    return function () {
        Target([DecoratorTarget.CLASS])(...arguments);
        WithDecorator(Component)(...arguments);
        WithDecorator(PostProcessor)(...arguments);
        WithAttribute(
            PostProcessorDecoratorConfiguration.ATTRIBUTE_KEY,
            new PostProcessorDecoratorConfiguration(targets, order)
        )(...arguments);
    };
}
