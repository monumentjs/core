import {Bind} from '@monument/language/main/decorator/Bind';


export function Delegate(): MethodDecorator {
    return Bind();
}
