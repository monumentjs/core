import {Type} from '../../Core/Types/Type';
import {ApplicationStarter} from '../ApplicationStarter';
import {Service} from '../../DI/Decorators/Service';


export function Boot(): ClassDecorator {
    return function (target: Function): void {
        Service()(target);

        ApplicationStarter.run(target as Type);
    };
}
