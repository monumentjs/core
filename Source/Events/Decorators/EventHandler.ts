import {Bind} from '../../Language/Decorators/Bind';


export function EventHandler(): MethodDecorator {
    return Bind();
}
