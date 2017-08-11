import {IEnumerable} from '../../Collections/IEnumerable';
import {Constructor} from '../../types';
import {Assert} from '../../Assertion/Assert';


export class ProvidersListValidator {
    public static get instance(): ProvidersListValidator {
        if (this._instance == null) {
            this._instance = new ProvidersListValidator();
        }

        return this._instance;
    }


    private static _instance: ProvidersListValidator;


    public validate(providers: IEnumerable<Constructor<any>>): void {
        Assert.argument('providers', providers).notNull();

        for (let index = 0; index < providers.length; index++) {
            Assert.argument(`providers[${index}]`, providers[index]).notNull();
        }
    }
}
