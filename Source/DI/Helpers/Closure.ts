import {Constructor} from '../../types';
import {Container} from '../Container/Container';


export function Closure(providers: Array<Constructor<any>>, func: Function) {
    return function () {
        const dependencies: any[] = providers.map((type) => Container.instance.get(type));
        const args = [...dependencies, ...arguments];

        return func.apply(null, args);
    };
}
