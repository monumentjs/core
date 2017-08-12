import {IEnumerable} from '../../Collections/IEnumerable';
import {Constructor} from '../../types';
import {Assert} from '../../Assertion/Assert';
import {Container} from './Container';
import {ProvidersListValidator} from '../Providers/ProvidersListValidator';


export class ClosureBuilder {
    public static get instance(): ClosureBuilder {
        if (this._instance == null) {
            this._instance = new ClosureBuilder();
        }

        return this._instance;
    }


    private static _instance: ClosureBuilder;


    private readonly providersListValidator: ProvidersListValidator = ProvidersListValidator.instance;


    public createClosure<TFunc extends Function>(container: Container, providers: IEnumerable<Constructor<any>>, fn: TFunc): TFunc {
        this.providersListValidator.validate(providers);
        Assert.argument('fn', fn).notNull();

        return function () {
            const dependencies: any[] = [];

            for (let type of providers) {
                dependencies.push(container.get(type));
            }

            const args = [...dependencies, ...arguments];

            return fn.apply(null, args);
        } as any;
    }
}
