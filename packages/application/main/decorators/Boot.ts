import {Type} from '@monument/core/main/Type';
import {ApplicationContext} from '../context/ApplicationContext';


export function Boot(): ClassDecorator {
    return function (target: Function) {
        const context: ApplicationContext = new ApplicationContext();

        context.scan(target as Type<object>);
        context.start();
    };
}
